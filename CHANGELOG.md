## 2.1.0 (2018-03-20)

- Update crypto module to use a specific algorithm as a params if is requested

## 2.0.0 (2018-02-15)

- Major update of all dependencies
- Update node version engine to >= 8.9.4

## 1.2.4  (2016-03-01)

Package update and travis & codeclimage integration

## 1.2.3 (2016-03-01)

- Change request module usage

## 1.2.0 (2016-01-20)

- Add function camelizeKeysMongoose that camelize keys of an Mongoose object
- Add function underscorizeKeysMongoose that underscorize keys of an Mongoose object

## 1.1.1 & 1.1.2 (2015-11-17)

- Fix a bug on camelize and underscore for complex object

## 1.1.0 (2015-11-04)

- Update Str.underscoreKeys and Str.camelizeKeys to keep safe first char of given key if is a special char
- Add a new method `isSpecilaChar` in Str module : to check if a given char is a special char

## 1.0.1 (2015-11-04)

- Add isJoi test on object before process full depth key

## 1.0.0 (2015-11-03)

- Add a camelize / underscore string function
- Change underscoreKeys and camelizeKeys method to process full deph of current object

## 0.8.1 (2015-10-19)

- Return false on encrypt / decrypt fn

## 0.8.0 (2015-10-12)

- Add camelizeKeys method on object module : rename first depth level key to camelize style

## 0.7.1 & 0.7.3 (2015-09-21)

- Change readme.md content

## 0.7.1 & 0.7.2 (2015-09-21)

- Minor fixes & Change readme.md content & removing old documentation

## 0.7.0 (2015-09-21)

Adding renameKeys function in object module.

## 0.6.0 (2015-09-21)

Adding new modules & functions :

Crypto Module :
- randomizedPassword : generate a random password
- encrypt : encrypt given string
- decrypt : decrypt a value encrypted with encrypt function

## 0.5.0 (2015-09-21)

Adding new modules & functions :

Date Module :

- generateList : Generate a list of date between two given index

## 0.4.0 (2015-09-21)

Adding new modules & functions :

Media Module :

- isValidImageFormat : Test is given image format is valid

## 0.3.0 (2015-09-21)

Adding new modules & functions :

Object Module :

- renameKey : rename a given key for another given
- inpect : get the current object to a string representation with a full depth

## 0.2.0 (2015-09-21)

Adding new modules & functions :

Request Module :

- getHost : Get current host name from request object

## 0.1.0 (2015-09-21)

Adding new modules & functions :

Strings Module :
- generateAsciiCharsList : Generate an list of chars from ascii table
- isUppercase : test if a given char is to uppercase
- isLowercase : test if a given char is to lowercase
