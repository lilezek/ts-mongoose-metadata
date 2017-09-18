import { ETypes, IBody, IClassType, IInterfaceType, IPrimitiveType, IType, IUnionType } from "awesome-metadata";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { IMongooseHook, IMongooseHooks } from "./decorators";
export * from "./decorators";

// tslint:disable-next-line:no-namespace
declare global {
  export namespace Reflect {
    export function getMetadata<T = any>(key: "mongoose-metadata:model", target: { new(...args: any[]): T }): mongoose.Model<mongoose.Document & T> | undefined;
  }
}

function getAtmBody(target: any) {
  return Reflect.getMetadata("atm:body", target) as IBody;
}

// function getRequired(target: any) {
//   return Reflect.getMetadata("mongoose-metadata:mandatory", target);
// }

function getUniques(target: any) {
  return Reflect.getMetadata("mongoose-metadata:unique", target);
}

function getVirtuals(target: any) {
  return Reflect.getMetadata("mongoose-metadata:virtuals", target);
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
    return atmBodyToSchemaConstructor(type.ctor);
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

function atmBodyToSchemaConstructor<V>(theClass: { new(...args: any[]): V }): mongoose.SchemaDefinition {
  const body = getAtmBody(theClass);
  const virtual = getVirtuals(theClass) || {};
  // const required = getRequired(theClass) || {};
  const unique = getUniques(theClass) || {};

  const schemaObject = {} as mongoose.SchemaDefinition;

  for (const k in body) {
    // Ignore virtuals. Virtuals must not persist.
    if (!(k in virtual)) {
      const obj = body[k];
      const type = obj.type;
      schemaObject[k] = { type: atmTypeToSchemaType(type) };
      if (k in unique) {
        schemaObject[k].index = { unique: true };
      }
      if (!obj.optional) {
        schemaObject[k].required = true;
      }
    }
  }

  return schemaObject;
}

export function classToModel<V>(theClass: { new(...args: any[]): V }, objectName: string, collname?: string) {
  let model = Reflect.getMetadata<V>("mongoose-metadata:model", theClass);
  if (!model) {
    const schemaObject = atmBodyToSchemaConstructor(theClass);
    const hooks = Reflect.getMetadata<V>("mongoose-metadata:hooks", theClass);
    const schema = new mongoose.Schema(schemaObject);
    // Register hooks:
    if (hooks) {
      for (const k in hooks) {
        const hook = hooks[k as keyof IMongooseHooks] as IMongooseHook;
        if (hook.post) {
          hook.post.forEach((p) => {
            schema.post(k, p);
          });
        }
        if (hook.pre) {
          hook.pre.forEach((p) => {
            schema.pre(k, p);
          });
        }
      }
    }

    // Register statics:
    for (const k in theClass) {
      if (theClass.hasOwnProperty(k)) {
        if (typeof (theClass as any)[k] === "function") {
          schema.statics[k] = (theClass as any)[k];
        }
      }
    }

    // Register methods:
    for (const k of Object.getOwnPropertyNames(theClass.prototype)) {
      if (k !== "constructor" && typeof theClass.prototype[k] === "function") {
        schema.methods[k] = theClass.prototype[k];
      }
    }
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
  return new mongoose.Schema(atmBodyToSchemaConstructor(theClass));
}
