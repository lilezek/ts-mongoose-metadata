import { ETypes, IBody, IClassType, IInterfaceType, IPrimitiveType, IType, IUnionType } from "awesome-metadata";
import * as mongoose from "mongoose";
import "reflect-metadata";

function getAtmBody(target: any) {
  return Reflect.getMetadata("atm:body", target) as IBody;
}

const mapTypes = {
  string: String,
  number: Number,
  boolean: Boolean,
  null: null,
  undefined,
  function: Function,
  object: Object,
} as any;

function atmTypeToSchemaType(type: IClassType | IInterfaceType | IPrimitiveType | IUnionType) {
  if (type.kind === ETypes.CLASS) {
    return atmBodyToSchemaConstructor(getAtmBody(type.ctor));
  } else if (type.kind === ETypes.INTERFACE) {
    return Object;
  } else if (type.kind === ETypes.PRIMITIVE) {
    return mapTypes[type.primitive];
  } else if (type.kind === ETypes.UNION) {
    if (!type.and) {
      // TODO: Implement this
      throw new Error("Type union not implemented");
    } else {
      // TODO: Implement this
      throw new Error("Type intersection not implemented");
    }
  }
}

function atmBodyToSchemaConstructor(body: IBody) {
  const schemaObject = {} as any;
  for (const k in body) {
    const obj = body[k];
    const type = obj.type;
    schemaObject[k] = atmTypeToSchemaType(type);
  }
  return schemaObject;
}

// tslint:disable-next-line:no-namespace
declare global {
  export namespace Reflect {
    export function getMetadata<T = any>(key: "mongoose-metadata:virtuals", target: { new(...args: any[]): T }): {[k in keyof T]: boolean } | undefined;
    export function getMetadata<T = any>(key: "mongoose-metadata:model", target: { new(...args: any[]): T }): mongoose.Model<mongoose.Document & T> | undefined;
  }
}

export function virtual<T = any>() {
  return (target: T, key: keyof T) => {
    let virtuals = Reflect.getMetadata<T>("mongoose-metadata:virtuals", target.constructor as any);
    if (!virtuals) {
      virtuals = {} as {[k in keyof T]: boolean };
      Reflect.defineMetadata("mongoose-metadata:virtuals", virtuals, target.constructor);
    }
    virtuals[key] = true;
  };
}

export function classToModel<V>(theClass: { new(...args: any[]): V }, objectName: string, collname?: string) {
  let model = Reflect.getMetadata<V>("mongoose-metadata:model", theClass);
  if (!model) {
    const schemaObject = atmBodyToSchemaConstructor(getAtmBody(theClass));
    // Use here virtuals and hooks.
    const schema = new mongoose.Schema(schemaObject);
    if (collname) {
      Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema, collname), theClass);
    } else {
      Reflect.defineMetadata("mongoose-metadata:model", model = mongoose.model(objectName, schema), theClass);
    }
  } else {
    throw new Error("This class had already registed a model");
  }
  return model;
}

export function classToSchema<V>(theClass: { new(...args: any[]): V }) {
  return new mongoose.Schema(atmBodyToSchemaConstructor(getAtmBody(theClass)));
}
