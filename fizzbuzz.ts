

// equality check: extends
// conditional branch: ternary
// filter: [K in keyof T as T[K] extends string ? K : never]: string
// pattern match: infer

// map an array of length l to a number l
type Length<T extends any[]> = 
  T extends { length: infer L } ? L : never;

// map a number l to an array of length l
type ToArray<L extends number, T extends any[] = []> =
  T extends { length: L } 
    // if T is already of the desired length L, return it
    ? T 
    // otherwise, add another element to the array (the any) and recurse
    : ToArray<L, [...T, any]>;

type Add<A extends number, B extends number> =
  Length<[...ToArray<A>, ...ToArray<B>]>;

type Subtract<A extends number, B extends number> =
  ToArray<A> extends [...(infer U), ...ToArray<B>] ? Length<U> : never;

type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

type AtLeastOneValueIsZero<A extends number, B extends number> =
  A extends 0 ? true : B extends 0 ? true : false;

type LessThan<A extends number, B extends number> =
  AtLeastOneValueIsZero<A, B> extends true
    ? IsEqual<A, B> extends true
      ? false
      : (A extends 0 ? true : false)
    : LessThan<Subtract<A, 1>, Subtract<B, 1>>;

type Mod<A extends number, B extends number> = 
  LessThan<A, B> extends true
    ? A
    : Mod<Subtract<A, B>, B>;

type And<A, B> = A extends true ? B extends true ? true : false : false;

type DivisableBy3<A extends number> = Mod<A, 3> extends 0 ? true : false;

type DivisableBy5<A extends number> = Mod<A, 5> extends 0 ? true : false;

type DivisableBy15<A extends number> = And<DivisableBy3<A>, DivisableBy5<A>>;
  
type FizzBuzzNumber<A extends number> = 
  DivisableBy15<A> extends true 
    ? "fizzbuzz"
  : DivisableBy3<A> extends true 
    ? "fizz"
  : DivisableBy5<A> extends true 
    ? "buzz"
  : `${A}`;

type FizzBuzz<A extends number, T extends string[] = [], I extends number = 1> =
  T extends { length: A }
    ? T
    : FizzBuzz<A, [...T, FizzBuzzNumber<I>], Add<I, 1>>;

type res = FizzBuzz<100>;
