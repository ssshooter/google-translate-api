# Class inheritance, super

class 可以 extends 自另一个 class。这是一个不错的语法，技术上基于原型继承。

要继承一个对象，需要在 `{..}` 前指定 `"extends"` 和父对象。


Here `Rabbit` inherits from `Animal`:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}

*!*
// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}
*/!*

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

The `extends` keyword actually adds a `[[Prototype]]` reference from `Rabbit.prototype` to `Animal.prototype`, just as you expect it to be, and as we've seen before.

![](animal-rabbit-extends.png)

So now `rabbit` has access both to its own methods and to methods of `Animal`.

````smart header="Any expression is allowed after `extends`"
Class syntax allows to specify not just a class, but any expression after `extends`.

For instance, a function call that generates the parent class:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
Here `class User` inherits from the result of `f("Hello")`.

That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.
````

## Overriding a method

Now let's move forward and override a method. As of now, `Rabbit` inherits the `stop` method that sets `this.speed = 0` from `Animal`.

If we specify our own `stop` in `Rabbit`, then it will be used instead:
