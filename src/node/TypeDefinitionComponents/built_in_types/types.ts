import * as t from ".";
import { XsType } from "./XsType";

const anyType = new t.XsAnyType();
const anySimpleType = new t.XsAnySimpleType(anyType);
const anyAtomicType = new t.XsAnyAtomicType(anySimpleType);
const string = new t.XsString(anyAtomicType);
// string
const normalizedString = new t.XsNormalizedString(string);
const token = new t.XsToken(normalizedString);
// string => token
const language = new t.XsLanguage(token);
const NMTOKEN = new t.XsNMTOKEN(token);
// string => token => NMTOKEN
const NMTOKENS = new t.XsNMTOKENS(NMTOKEN);

const Name = new t.XsName(token);
const NCName = new t.XsNCName(Name);
const ID = new t.XsID(NCName);
const IDREF = new t.XsIDREF(NCName);
const boolean = new t.XsBoolean(anyAtomicType);
const dateTime = new t.XsDateTime(anyAtomicType);
const double = new t.XsDouble(anyAtomicType);
const float = new t.XsFloat(anyAtomicType);
const decimal = new t.XsDecimal(anyAtomicType);
const integer = new t.XsInteger(decimal);
const long = new t.XsLong(integer);


export const types: { [key: string]: XsType } = {
    "xs:anyType": anyType,
    "xs:anySimpleType": anySimpleType,
    "xs:anyAtomicType": anyAtomicType,
    // string
    "xs:string": string,
    "xs:normalizedString": normalizedString,
    "xs:token": token,
    "xs:language": language,
    "xs:NMTOKEN": NMTOKEN,
    "xs:NMTOKENS": NMTOKENS,
    "xs:Name": Name,
    "xs:NCName": NCName,
    "xs:ID": ID,
    "xs:IDREF": IDREF,
    "xs:dateTime": dateTime,
    "xs:boolean": boolean,
    "xs:decimal": decimal,
    "xs:double": double,
    "xs:float": float,
    "xs:integer": integer,
    "xs:long": long,
    // TODO: below items are undefined. you should define them
    "xs:duration": integer,
    "xs:time": string,
    "xs:date": string,
    "xs:gYearMonth": integer,
    "xs:gYear": integer,
    "xs:gMonthDay": integer,
    "xs:gDay": integer,
    "xs:gMonth": integer,
    "xs:hexBinary": string,
    "xs:base64Binary": string,
    "xs:anyURI": string,
    "xs:QName": string,
    "xs:NOTATION": string
}


