/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import { CodeGen } from './codeGen'
import {
  IMethod,
  IParameter,
  IProperty,
  IType,
  EnumType,
  snakeCase,
  titleCase,
} from './sdkModels'

// eslint-disable @typescript-eslint/no-unused-vars

/**
 * Protobuf and grpc generator
 */
export class ProtoGen extends CodeGen {
  saveMethods: IMethod[] = []
  codePath = './proto/grpc_proxy/src/main/proto'
  packagePath = ''
  sdkPath = 'sdk'
  itself = ''
  fileExtension = '.proto'
  commentStr = '// '
  nullStr = 'null'
  transport = 'transport'

  argDelimiter = ', '
  paramDelimiter = ',\n'
  propDelimiter = '\n'
  codeQuote = '"'
  enumDelimiter = ',\n'

  indentStr = '  '
  endTypeStr = '\n}'
  needsRequestTypes = false
  willItStream = true

  private readonly defaultApi = '4.0'

  isDefaultApi() {
    return this.apiVersion === this.defaultApi
  }

  supportsMultiApi() {
    return false
  }

  sdkFileName(baseFileName: string) {
    return this.fileName(`sdk/${baseFileName}`)
  }

  /**
   * grpc signature generator
   *
   * @param {string} indent indentation for code
   * @param {IMethod} method for signature
   * @returns {string} prototype declaration of method
   */
  methodSignature(indent: string, method: IMethod): string {
    indent = ''
    const params = method.allParams
    const args = params.map((p) => p.name)
    return `${indent}${method.operationId}(${args.join(', ')}): ${
      method.primaryResponse.type.name
    }`
  }

  construct(_indent: string, _type: IType): string {
    return ''
  }

  declareMethod(_indent: string, _method: IMethod): string {
    this.saveMethods.push(_method)
    const methodName = titleCase(_method.operationId)
    return `${this.formatComments(
      _method.description
    )}  rpc ${methodName}(${methodName}Request) returns (${methodName}Response);`
  }

  declareStreamer(_indent: string, _method: IMethod): string {
    const methodName = titleCase(_method.operationId)
    return `${this.formatComments(
      _method.description
    )}  rpc ${methodName}(${methodName}Request) returns (stream ${methodName}Response);`
  }

  declareParameter(
    _indent: string,
    _method: IMethod,
    _param: IParameter
  ): string {
    return ''
  }

  declareProperty(_indent: string, _property: IProperty): string {
    return `${this.formatComments(_property.description)}  ${this.mapType(
      _property.type.name
    )} ${_property.name} = ${_indent};\n`
  }

  encodePathParams(_indent: string, _method: IMethod): string {
    return ''
  }

  methodsEpilogue(_indent: string): string {
    return '}'
  }

  methodsPrologue(_indent: string): string {
    return this.servicesPrologue('LookerService')
  }

  streamsPrologue(_indent: string): string {
    return this.servicesPrologue('LookerStreamingService')
  }

  modelsEpilogue(_indent: string): string {
    return this.saveMethods
      .map((method) => {
        return `
message ${titleCase(method.operationId)}Request {
${this.methodArguments(method)}    
}        

message ${titleCase(method.operationId)}Response {
  // status code from call
  sint32 status_code = 1;
  // message in the event of an error
  string message = 2;
  // documentation url
  string documentation_url = 3;
  ${this.methodResponse(method, 4).trim()}
}        
`
      })
      .join('')
  }

  modelsPrologue(_indent: string): string {
    return `
syntax = "proto3";

package looker;

import "google/protobuf/any.proto";
import "google/protobuf/timestamp.proto";
    `
  }

  summary(_indent: string, _text: string | undefined): string {
    return ''
  }

  typeSignature(_indent: string, _type: IType): string {
    return ''
  }

  beginRegion(_: string, description: string): string {
    return `  // ${description}`
  }

  endRegion(): string {
    return ''
  }

  declareType(_: string, type: IType) {
    let propertyValues = ''
    let typeType
    if (type instanceof EnumType) {
      typeType = 'enum'
      const num = type as EnumType
      propertyValues = num.values
        .map((enumType, index) => {
          return `  ${snakeCase(
            type.name
          ).toUpperCase()}_${enumType.toString().toUpperCase()} = ${index};\n`
        })
        .join('')
    } else {
      typeType = 'message'
      propertyValues = Object.values(type.properties)
        .map((prop, index) => {
          return this.declareProperty((index + 1).toString(), prop)
        })
        .join('')
    }

    return `${this.formatComments(type.description).trim()}      
${typeType} ${type.name} {
  ${propertyValues.trim()}
}`
  }

  private servicesPrologue(serviceName: string) {
    return `
syntax = "proto3";

package looker;    

option java_package = "com.google.looker.proto.services";
option java_multiple_files = true;

import 'sdk/models.proto';

service ${serviceName} {
    `
  }

  private formatComments(comments: string) {
    return comments.trim().length === 0
      ? ''
      : comments
          .split('\n')
          .map((part) => `  // ${part}\n`)
          .join('')
  }

  private methodArguments(method: IMethod) {
    return (
      '  ' +
      method.allParams
        .map((param, index) => {
          return `${this.formatComments(param.description)}  string ${
            param.name
          } = ${index + 1};\n`
        })
        .join('')
        .trim()
    )
  }

  private methodResponse(method: IMethod, index: number) {
    if (method.returnType) {
      const description = this.formatComments(
        method.returnType?.description || ''
      )
      const returnType = method.returnType.type.name
      if (returnType === 'void') {
        return `${description}`
      } else {
        return `${description}  ${this.mapType(
          returnType
        )} result = ${index};\n`
      }
    } else {
      return ''
    }
  }

  private mapType(type: string): string {
    if (type.startsWith('Hash[')) {
      return `map<string, ${this.mapType(type.substring(5, type.length - 1))}>`
    } else if (type.endsWith('[]')) {
      return `repeated ${type.substring(0, type.length - 2)}`
    } else if (type === 'boolean') {
      return 'bool'
    } else if (type === 'datetime') {
      return 'google.protobuf.Timestamp'
    } else if (type === 'any') {
      return 'google.protobuf.Any'
    } else if (type === 'uri') {
      return 'string'
    } else {
      return type
    }
  }
}
