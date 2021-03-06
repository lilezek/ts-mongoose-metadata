# TypeScript Mongoose Metadata

Using [awesome-metadata](https://github.com/lilezek/awesome-metadata) (a.k.a atm) to emit additional metadata for all classes, this project 
converts these metadata into a Mongoose Schema.

# Goals

The goal of this project is to offer an automatic way to map classes to mongo database by using mongoose and metadata from classes.

The actual TypeScript metadata emitted is not powerful enough to do it, so this project depends on atm.    

## Features

* [x] Class body to mongoose schema.
  * [x] Every member is mapped into the mongoose schema.
  * [x] Non optional members are marked as required.
* [x] @virtual decorator.
  * [x] If a member is @virtual it won't be mapped into the Schema.
* [x] Decorators for mongoose hooks (pre/post save, pre/post load...).
  * [x] pre/post hooks for save, init, validate, and remove
  * [x] pre/post create hook, triggered before/after doing `new Model({...})`.
* [ ] Interface body to mongoose schema.
  * Not supported because atm does not support interfaces yet.

# Example of usage

Let say we want to implement a basic user with login and password fields.

Also, the user will have a logger created after the user is loaded or created.

```ts
import { Logger } from "typescript-logging";
import LOG = require("../lib/logger");
import { classToModel, virtual } from "ts-mongoose-metadata";

/**
 * User roles
 */
export enum UserRole {
  ADMINISTRATOR,
  PLAIN_USER,
}

/**
 * User definition as a class instead of as a Schema.
 */
export class UserClass {
  public created: Date;
  public name: string;
  public password: string;
  public role: UserRole; // This field will be mapped to number.

  @virtual()
  private logger: Logger;

  @preValidate()
  public async preValidate() {
    if (!this.created) {
      this.created = new Date();
    }
  }

  @postCreate()
  public postCreate() {
    this.logger = LOG("User " + this.name);    
  }

  @postInit()
  public async postLoad() {
    this.logger = LOG("User " + this.name);
  }

  public log(s: string) {
    this.logger.info(s);
  }
}

// Important to include the metadata generated from the awesome-metadata emitter after 
// the definition of the class, and before generating the model.
import "../metadata";

export default UserClass;

export const User = classToModel(UserClass, "user");
```

# Metadata emitted

This project emits two metadatas:

* `mongoose-metadata:virtuals`: The list of `@virtual` members of a class.
* `mongoose-metadata:model`: The model generated by using `classToModel` function. 