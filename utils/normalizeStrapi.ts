export type RecursiveNormalize<O extends object> = O extends Array<infer inner>
  ? inner extends object
    ? RecursiveNormalizeStrapiObject<NonNullable<inner>>[]
    : inner extends Nullable<object>
    ? RecursiveNormalizeStrapiObject<NonNullable<inner>>[] | null
    : never
  : RecursiveNormalizeStrapiObject<O>;

export const normalizeStrapi = <T extends object>(
  param: T,
): RecursiveNormalize<T> => {
  if (param === null) {
    return null as RecursiveNormalize<T>;
  }
  if (Object.keys(param).length === 0) {
    return param as RecursiveNormalize<T>;
  }
  if (Array.isArray(param)) {
    return param.map(item =>
      // @ts-expect-error I don't think this is actually a problem. We'll see
      normalizeStrapi(item),
    ) as RecursiveNormalize<T>;
  }
  if (isFlattenStrapiParam(param)) {
    return normalizeStrapi(
      // I think this should be cast as something else
      normalizeStrapiDataFN(param) as RecursiveNormalize<T>,
    ) as RecursiveNormalize<T>;
  }

  return Object.fromEntries(
    Object.entries(param).map(([key, val]) => {
      // if (key === 'data' || key === 'attributes') {

      // }
      return [
        key,
        isFlattenStrapiParam(val) || key === 'data' || key === 'attributes'
          ? normalizeStrapi(normalizeStrapiDataFN(val))
          : val,
      ];
    }),
  ) as RecursiveNormalize<T>;
};

const flatMap = <T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[],
): U[] => Array.prototype.concat(...array.map(callbackfn));

type StrapiAttributesObject = {
  attributes: any;
  id?: number;
};

type Nullable<T> = T | null;

/**
 * An example describes this best:
 * type type1 = number | null;
 * type test = type1 extends number ? 'this is a number' : 'this is definitely not a number' // will be 'this is definitely not a number' even though it could be a number
 * type test = NullableTernary<type1, number, 'this can be a number', 'this cannot be a number'> // will be 'this can be a number' | null
 *
 * This allows us to more elegantly handle ternarys on nullable types
 */
type NullableTernary<typeToBeTested, extensionToTest, exprIfTrue, exprIfFalse> =
  typeToBeTested extends extensionToTest
    ? exprIfTrue
    : typeToBeTested extends Nullable<extensionToTest>
    ? exprIfTrue | null
    : exprIfFalse;

type FlattenAttributes<O extends object> = O extends StrapiAttributesObject[]
  ? (O[number]['attributes'] & Omit<O[number], 'attributes'>)[]
  : O extends StrapiAttributesObject
  ? Omit<O, 'attributes'> & O['attributes']
  : never;

type FlattenStrapiParam =
  | StrapiCollectionWithDataResponse
  | StrapiAttributesObject
  | null;

type StrapiCollectionWithData = {
  data: StrapiAttributesObject[] | StrapiAttributesObject | [] | null;
};

type RecursiveFlattenParam = {
  [key: string]: FlattenStrapiParam;
};

// perhaps FlattenStrapiParamSingular idk?
type StrapiFlattenableObjectTempName =
  | StrapiAttributesObject
  | StrapiCollectionWithData;

type StrapiCollectionWithDataResponse =
  | StrapiCollectionWithData[]
  | StrapiCollectionWithData;

// Ok I think I need to make this handle objects not just FlattenStrapi to handle double nested situations like with challenge
type RecursiveNormalizeStrapiObject<O extends object> =
  O extends StrapiFlattenableObjectTempName
    ? RecursiveNormalize<NormalizeStrapi<O>>
    : {
        [P in keyof O]: NullableTernary<
          O[P],
          FlattenStrapiParam,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          RecursiveNormalize<NormalizeStrapi<O[P]>>,
          O[P]
        >;
      };

type FlattenData<O> = O extends { data: Array<infer dataObj> }
  ? Array<NonNullable<dataObj>>
  : O extends { data: infer dataObj }
  ? /**
     * For some reason the data object is considered by strapi to
     * be nullable. I haven't seen any valid reason for this so I've
     * removed it. But that might change in the future if I find a
     * valid reason
     */
    NonNullable<dataObj>
  : never;

// I'm also assuming that if data is singular and null it's because of weird typing stuff from strapi's part and just get rid of it. Technically, this could lead to errors, but I can't imagine any situation right now where it would. But still, stay on the lookout
type NormalizeStrapiCollectionWithData<
  O extends StrapiCollectionWithDataResponse,
> = O extends StrapiCollectionWithData[]
  ? FlattenAttributes<FlattenData<O>>[]
  : O extends StrapiCollectionWithData
  ? FlattenAttributes<FlattenData<O>>
  : never;

type NormalizeStrapi<O extends FlattenStrapiParam> =
  O extends StrapiCollectionWithDataResponse
    ? NormalizeStrapiCollectionWithData<O>
    : O extends StrapiAttributesObject
    ? FlattenAttributes<O>
    : null;

// I am pretty sure I'm stripping null. Which is good, but it
// should be more explicit/configurable. Will revisit later
const normalizeStrapiDataFN = <T extends FlattenStrapiParam>(
  param: T,
): NormalizeStrapi<T> => {
  if (param === null) {
    return null as NormalizeStrapi<T>;
  }
  if (isStrapiAttributesObject(param)) {
    return isFlattenStrapiParam(param.attributes)
      ? normalizeStrapiDataFN(param.attributes)
      : param.attributes;
  }
  if (isStrapiCollectionWithData(param)) {
    const { data } = param;

    if (Array.isArray(data)) {
      return flatMap(data, item =>
        item.attributes ? [{ ...item.attributes, id: item?.id as number }] : [],
      ) as NormalizeStrapi<T>;
    }

    return {
      ...data?.attributes,
      id: data?.id as number,
    } as NormalizeStrapi<T>;
  }
  return param.map(normalizeStrapiDataFN) as NormalizeStrapi<T>;
};

const isStrapiCollectionWithData = (
  arg: object,
): arg is StrapiCollectionWithData => {
  return !!arg && 'data' in arg;
};

const isStrapiAttributesObject = (
  arg: object,
): arg is StrapiAttributesObject => {
  return !!arg && 'attributes' in arg;
};

const isFlattenStrapiParam = (arg: unknown): arg is FlattenStrapiParam => {
  if (Array.isArray(arg)) {
    return arg.every(item => isFlattenStrapiParam(item));
    // return arg.every(isFlattenStrapiParam);
  }
  if (arg === null) {
    // it's fine for this to be true or false tbh
    return true;
  }
  if (typeof arg !== 'object') {
    return false;
  }
  if (isStrapiAttributesObject(arg)) {
    return true;
  }
  if (isStrapiCollectionWithData(arg)) {
    return true;
  }
  return false;
};
