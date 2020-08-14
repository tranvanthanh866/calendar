/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./platform/calendar/resources/assets/calendar/calendar-control.js":
/*!*************************************************************************!*\
  !*** ./platform/calendar/resources/assets/calendar/calendar-control.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(function () {
  var date = moment().format('YYYY-MM-DD');
  var time = moment().format('HH:mm:ss');
  Vue.config.devtools = true;
  var form_data_default = {
    title: '',
    description: '',
    date_start: '',
    time_start: '',
    date_end: '',
    time_end: '',
    allDay: false,
    _allDay: 0,
    background_group: [{
      _text_display: 'Black',
      hex_color_code: '#212529',
      "class": 'Black'
    }, {
      _text_display: 'White',
      hex_color_code: '#fff',
      "class": 'white'
    }, {
      _text_display: 'Blue',
      hex_color_code: '#3788d8',
      "class": 'Blue'
    }, {
      _text_display: 'Green',
      hex_color_code: '#008000',
      "class": 'green'
    }, {
      _text_display: 'Red',
      hex_color_code: '#ff0000',
      "class": 'red'
    }, {
      _text_display: 'Yellow',
      hex_color_code: '#ffff00',
      "class": 'yellow'
    }, {
      _text_display: 'Brown',
      hex_color_code: '#a52a2a',
      "class": 'brown'
    }, {
      _text_display: 'Orange',
      hex_color_code: '#ffa500',
      "class": 'orange'
    }, {
      _text_display: 'Pink',
      hex_color_code: '#ffc0cb',
      "class": 'pink'
    }, {
      _text_display: 'Silver',
      hex_color_code: '#c0c0c0',
      "class": 'silver'
    }, {
      _text_display: 'TEAL',
      hex_color_code: '#008080',
      "class": 'TEAL'
    }, {
      _text_display: 'OLIVE',
      hex_color_code: '#000080',
      "class": 'OLIVE'
    }, {
      _text_display: 'LIME',
      hex_color_code: '#00FF00',
      "class": 'LIME'
    }],
    background_color: "#3788d8",
    name_background_color: "Blue",
    text_color: "#212529",
    name_text_color: "Black",
    repeat_weeks: [{
      value: 1,
      name: "Every Mondays"
    }, {
      value: 2,
      name: "Every Tuesdays"
    }, {
      value: 3,
      name: "Every Wednesdays"
    }, {
      value: 4,
      name: "Every Thursdays"
    }, {
      value: 5,
      name: "Every Fridays"
    }, {
      value: 6,
      name: "Every Saturdays"
    }, {
      value: 0,
      name: "Every Sundays"
    }],
    repeat: [],
    calendar_event_id: '',
    calendar_date_id: '',
    name_btn_action: "Save changes",
    class_btn_action: "save-time"
  };
  var modal_vue = new Vue({
    el: '#form-time',
    data: {
      from_data: form_data_default
    },
    methods: {
      setDateTimeDefault: function setDateTimeDefault() {
        var _this = this;

        _this.from_data = _this.dataDefault;
      },
      dataDefault: function dataDefault() {
        return {
          title: '',
          description: '',
          background_color: '#3788d8',
          name_background_color: 'Blue',
          name_text_color: 'Black',
          text_color: '#212529',
          repeat: [],
          calendar_event_id: '',
          calendar_date_id: ''
        };
      },
      pushData: function pushData(e) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
          var _this, ele_btn, data;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this = _this2;
                  ele_btn = $(e.target);
                  data = _this.from_data;
                  _context.next = 5;
                  return save_data(data);

                case 5:
                  modal_time.modal('hide');

                  if (ele_btn.hasClass('save-time') === true) {} else {}

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      checkData: function checkData() {
        var _this = this;

        console.log(1);
        console.log(_this.repeat);
      }
    }
  });
  var year = new Date().getFullYear();
  var modal_time = $('#form-time');
  var form_time = $('#form-date-time');

  var _calendar = $('#calendar');

  $('.repeat-date').SumoSelect({
    triggerChangeCombined: false,
    placeholder: 'Repeat event'
  });
  $('#date-time .time').timepicker({
    'showDuration': true,
    'timeFormat': 'H:i:s'
  });
  $('#form-date-time .input-daterange').datepicker({
    format: "yyyy-mm-dd",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 90)),
    autoclose: true
  });
  $('#form-date-time .input-daterange').datepicker().on('changeDate', function (ev) {
    modal_vue.$data.from_data.date_start = $('#date_start').val();
    modal_vue.$data.from_data.date_end = $('#date_end').val();
  }); // set value event

  $('#date-time .time').on('changeTime', function (e) {
    var _input = $(this);

    if (_input.hasClass('start')) {
      modal_vue.$data.from_data.time_start = _input.val();
    }

    if (_input.hasClass('end')) {
      modal_vue.$data.from_data.time_end = _input.val();
    }
  });
  $(".SumoSelect li").bind('click.check', function (event) {
    modal_vue.$data.from_data.repeat = $('#repeat-date').val();
  });

  var _colors = $('._select_color_drop li');

  for (var i = _colors.length - 1; i >= 0; i--) {
    //console.log(_colors[i]);
    $(_colors[i]).click(function () {
      var color_text = $(this).find('span').attr('_text_display');

      var _select_color = $(this).closest('._select_color_drop');

      var _hex_code = $(this).find('span').attr('data-hex_code');

      var input_hidden_change = _select_color.find('.input_color');

      if (input_hidden_change.hasClass('background_color')) {
        modal_vue.$data.from_data.background_color = _hex_code;
        modal_vue.$data.from_data.name_background_color = color_text;
      }

      if (input_hidden_change.hasClass('text_color')) {
        modal_vue.$data.from_data.text_color = _hex_code;
        modal_vue.$data.from_data.name_text_color = color_text;
      }
    });
  }
  /*// initialize datepair
  let basicExampleEl = document.getElementById('date-time');
  let datepair = new Datepair(basicExampleEl);*/


  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
    header: {
      left: 'prev,next,today',
      center: 'title',
      right: 'listWeek,timeGridDay,timeGridWeek,dayGridMonth'
    },
    eventLimit: true,
    defaultView: 'timeGridWeek',
    displayEventTime: true,
    editable: true,
    events: SITEURL + "/get_data",
    selectable: true,
    firstDay: 1,
    // Sunday=0, Monday=1, Tuesday=2, etc.

    /*dateClick: function(info) {
        alert('clicked ' + info.dateStr);
    },*/
    select: function () {
      var _select = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(info) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (check_date_event(info)) {
                  setDataEvent(info);
                  modal_time.modal('show');
                } else {
                  displayErrorMessage('Past day can not add events');
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function select(_x) {
        return _select.apply(this, arguments);
      }

      return select;
    }(),
    eventDragStart: function eventDragStart(info) {
      console.log(info);

      if (check_date_event(info) === false) {
        return false;
      }
    },
    eventDragStop: function eventDragStop(info) {
      console.log('eventDragStop');
    },
    eventReceive: function eventReceive() {
      console.log('eventReceive');
    },
    eventResize: function () {
      var _eventResize = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(resizeInfo) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!check_date_event(resizeInfo)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return update_data(resizeInfo);

              case 3:
                calendar.refetchEvents();
                _context3.next = 6;
                break;

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function eventResize(_x2) {
        return _eventResize.apply(this, arguments);
      }

      return eventResize;
    }(),
    eventDrop: function () {
      var _eventDrop = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(dropInfo) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!check_date_event(dropInfo)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return update_data(dropInfo);

              case 3:
                calendar.refetchEvents();
                _context4.next = 6;
                break;

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function eventDrop(_x3) {
        return _eventDrop.apply(this, arguments);
      }

      return eventDrop;
    }(),
    eventClick: function () {
      var _eventClick = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(info) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (check_date_event(info.event)) {
                  setDataEvent(info.event);
                  modal_vue.$data.from_data.name_btn_action = "Update";
                  modal_vue.$data.from_data.class_btn_action = "btn-update";
                  modal_time.modal('show');
                  /*let deleteMsg = confirm("Do you really want to delete?");
                  if (deleteMsg) {
                      await delete_event(info.event);
                      calendar.refetchEvents();
                  }*/
                }

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function eventClick(_x4) {
        return _eventClick.apply(this, arguments);
      }

      return eventClick;
    }(),
    dayRender: function dayRender(info) {
      var today = moment().format("YYYY-MM-DD"); //console.log(info);
      //console.log(moment(date.date).format("YYYY-MM-DD HH:mm:ss"));

      var end = new Date();
      /*end.setDate(today.getDate()+7);
      let time_start = moment(info.start).format("HH:mm:ss");
      let date_end = moment(info.end).format("YYYY-MM-DD");*/

      /*if (date.getDate() === today.getDate()) {
          //cell.css("background-color", "red");
      }*/

      if (moment(info.date).format("YYYY-MM-DD") < today) {
        $(info.el).addClass('no-change-event').css("background-color", "#e9e9e9");
      }
    },
    selectAllow: function selectAllow(selectInfo) {
      if (check_date_event(selectInfo)) {
        return true;
      } else {
        return false;
      }
    }
  });
  calendar.render();

  function update_data(_x5) {
    return _update_data.apply(this, arguments);
  }

  function _update_data() {
    _update_data = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(info) {
      var _date_start, _time_start, _date_end, _time_end, data, _data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _date_start = moment(info.event.start).format('YYYY-MM-DD');
              _time_start = moment(info.event.start).format("HH:mm:ss");
              _date_end = _date_start;
              _time_end = _time_start;

              if (info.event.end !== null) {
                _date_end = moment(info.event.end).format("YYYY-MM-DD");
                _time_end = moment(info.event.end).format("HH:mm:ss");
              }

              data = info.event._def.extendedProps;
              console.log(info.event.end);
              _data = {
                'title': info.event.title,
                'date_start': _date_start,
                'time_start': _time_start,
                'date_end': _date_end,
                'time_end': _time_end,
                'calendar_event_id': data.calendar_event_id,
                'calendar_date_id': data.calendar_date_id,
                'allDay': info.event.allDay ? 1 : 0
              };
              $.ajax({
                url: SITEURL + '/fullcalendar/update',
                data: {
                  'title': info.event.title,
                  'date_start': _date_start,
                  'time_start': _time_start,
                  'date_end': _date_end,
                  'time_end': _time_end,
                  'calendar_event_id': data.calendar_event_id,
                  'calendar_date_id': data.calendar_date_id,
                  'allDay': info.event.allDay ? 1 : 0
                },
                type: "POST",
                success: function success(response) {
                  displayMessage("Updated Successfully");
                }
              });

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _update_data.apply(this, arguments);
  }

  function save_data(_x6) {
    return _save_data.apply(this, arguments);
  }

  function _save_data() {
    _save_data = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(data) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              $.ajax({
                url: SITEURL + "/fullcalendar/create",
                data: data,
                type: "POST",
                success: function success(response) {
                  calendar.refetchEvents();
                  displayMessage("Added Successfully");
                }
              });

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _save_data.apply(this, arguments);
  }

  function delete_event(_x7) {
    return _delete_event.apply(this, arguments);
  }

  function _delete_event() {
    _delete_event = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(event) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              console.log(event);
              $.ajax({
                type: "POST",
                url: SITEURL + '/fullcalendar/delete',
                data: {
                  'calendar_event_id': event._def.extendedProps.calendar_event_id,
                  'calendar_date_id': event._def.extendedProps.calendar_date_id
                },
                success: function success(response) {
                  if (parseInt(response) > 0) {
                    displayMessage("Deleted Successfully");
                  }
                }
              });

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _delete_event.apply(this, arguments);
  }

  function check_date_event(info) {
    var date_start = moment(info.start).format('YYYY-MM-DD');
    var today = moment().format('YYYY-MM-DD');
    return date_start >= today;
  }

  modal_time.on('hidden.bs.modal', function () {
    dataDefault();
    $('.optWrapper ul li').removeClass('selected');
    $('#repeat-date').val([]);
    $('.SumoSelect p.CaptionCont').attr('title', 'Repeat event').find('span').addClass('placeholder').text('Repeat event');
  });

  var setDataEvent = function setDataEvent(info) {
    var date_start = moment(info.start).format('YYYY-MM-DD');
    var time_start = moment(info.start).format("HH:mm:ss");
    var date_end = moment(info.end).format("YYYY-MM-DD");
    var time_end = moment(info.end).format("HH:mm:ss"); //let today = moment().format('YYYY-MM-DD');

    modal_vue.$data.from_data.date_start = date_start;
    modal_vue.$data.from_data.date_end = date_end;
    modal_vue.$data.from_data.time_start = time_start;
    modal_vue.$data.from_data.time_end = time_end;
    modal_vue.$data.from_data.allDay = info.allDay;

    if (typeof info._def !== "undefined") {
      modal_vue.$data.from_data.title = info._def.title;
      modal_vue.$data.from_data.description = info._def.extendedProps.description;
      modal_vue.$data.from_data.calendar_date_id = info._def.extendedProps.calendar_date_id;
      modal_vue.$data.from_data.calendar_event_id = info._def.extendedProps.calendar_event_id;
      modal_vue.$data.from_data.background_color = info.backgroundColor;
      modal_vue.$data.from_data.text_color = info.textColor;
      modal_vue.$data.from_data.background_color = info.backgroundColor;
      modal_vue.$data.from_data.text_color = info.textColor;
      modal_vue.$data.from_data.name_background_color = info._def.extendedProps.background_color_name;
      modal_vue.$data.from_data.name_text_color = info._def.extendedProps.text_color_name;
    }
  };

  var dataDefault = function dataDefault() {
    modal_vue.$data.from_data.title = '';
    modal_vue.$data.from_data.description = '';
    modal_vue.$data.from_data.background_color = '#3788d8';
    modal_vue.$data.from_data.name_background_color = 'Blue';
    modal_vue.$data.from_data.name_text_color = 'Black';
    modal_vue.$data.from_data.text_color = '#212529';
    modal_vue.$data.from_data.repeat = [];
    modal_vue.$data.from_data.calendar_event_id = '';
    modal_vue.$data.from_data.calendar_date_id = '';
    modal_vue.$data.from_data.name_btn_action = 'Save changes';
    modal_vue.$data.from_data.class_btn_action = "save-time";
  };

  modal_time.on('shown.bs.modal', function () {
    var check = modal_time.find('#allDay').is(":checked");
    switchCheckBbox(check);
  });
  $('#allDay').change(function () {
    switchCheckBbox(this.checked);
  });

  function switchCheckBbox(check) {
    modal_time.find('#time_start').attr('disabled', check);
    modal_time.find('#time_end').attr('disabled', check);

    if (check) {
      modal_vue.$data.from_data._allDay = 1;
    } else {
      modal_vue.$data.from_data._allDay = 0;
    }
  }

  function displayMessage(message) {
    $.notify(message, "success");
  }

  function displayErrorMessage(message) {
    $.notify(message, "error");
  }
});

/***/ }),

/***/ 1:
/*!*******************************************************************************!*\
  !*** multi ./platform/calendar/resources/assets/calendar/calendar-control.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\laravel\calendar\platform\calendar\resources\assets\calendar\calendar-control.js */"./platform/calendar/resources/assets/calendar/calendar-control.js");


/***/ })

/******/ });