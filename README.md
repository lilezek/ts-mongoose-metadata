# TypeScript Mongoose Metadata

Using [awesome-metadata](https://github.com/lilezek/awesome-metadata) (a.k.a atm) to emit additional metadata for all classes, this project 
converts these metadata into a Mongoose Schema.

# Goals

The goal of this project is to an automatic way to map classes to mongo by using mongoose and metadata.

The actual TypeScript metadata emitted is not powerful enough to do it, so this project depends on atm.    

## Features

* [x] Class body to mongoose schema.
  * [x] Every member is mapped into the mongoose schema.
  * [ ] Mandatory members are marked as mandatory.
* [x] @virtual decorator.
  * [x] If a member is @virtual it won't be mapped into the Schema.
* [ ] Decorators for mongoose hooks (pre/post save, pre/post load...).
  * Not implemented yet.
* [ ] Interface body to mongoose schema.
  * Not supported because atm does not support interfaces yet.
