/// <reference types="mongoose" />
import * as mongoose from "mongoose";
import "reflect-metadata";
declare global  {
    namespace Reflect {
        function getMetadata<T = any>(key: "mongoose-metadata:virtuals", target: {
            new (...args: any[]): T;
        }): {
            [k in keyof T]: boolean;
        } | undefined;
        function getMetadata<T = any>(key: "mongoose-metadata:model", target: {
            new (...args: any[]): T;
        }): mongoose.Model<mongoose.Document & T> | undefined;
    }
}
export declare function virtual<T = any>(): (target: T, key: keyof T) => void;
export declare function classToModel<V>(theClass: {
    new (...args: any[]): V;
}, objectName: string, collname?: string): mongoose.Model<mongoose.Document & V>;
export declare function classToSchema<V>(theClass: {
    new (...args: any[]): V;
}): mongoose.Schema;
