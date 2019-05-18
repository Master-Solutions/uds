
## Overview

Let C be a set of all classes (not a set of complex numbers).
We define a binary operation `*` as follows: 

*: C x C -> C 
 
Essentially given two classes from C, after applying `*` we get a new class with merged properties, methods, constructors, etc. 

Note: I'm still not sure if `*` can be commutative. It can be, if we drop any concepts related to inheritance where base and inherited classes 
relation is defined. 


## Class descriptor

Let's associate a special object called `descriptor` with any class. This descriptor should include info about all members a class has.
For example: 

```
{    
    init: (param) => {
        this.bar = param;
    }  
    props: {
        bar: 'bar'
    },
    methods: {
        hello: (name) => `Hello, ${name}!`,
        foo: () => this.bar;
    }
}
``` 


