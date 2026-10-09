---
title: "Why software testing matters (and the testing pyramid)"
date: "2026-10-03"
description: "Tests aren't about proving code works — they're about making change safe. A look at why that matters and how the testing pyramid helps you spend effort where it pays off."
---

Most people learn to write tests before they understand why tests matter. You're told
"write a test for this," you write it, it passes, you move on. The actual payoff only
shows up later — six months in, when you change a function used in twelve places and
find out in thirty seconds instead of in production.

## Tests are a safety net for change, not proof of correctness

A passing test suite doesn't mean your code is correct. It means your code still does
what it did when you wrote the tests. That sounds like a smaller claim, but it's the
one that actually matters day to day:

- **Refactoring becomes safe.** You can restructure how something works without fear,
  because anything you break shows up immediately instead of three sprints later.
- **Regressions get caught at the cheapest possible point** — on your machine, in CI,
  before a reviewer or a user ever sees them.
- **Tests document behavior.** A test named
  `throws when discount exceeds order total` tells the next person what the function
  is *supposed* to do, in a way a comment can go stale without anyone noticing.

None of that requires "100% coverage." It requires testing the things that are
expensive to get wrong.

## A concept worth knowing: the testing pyramid

Not all tests are equal, and treating them as interchangeable is how test suites
become slow, flaky, and eventually ignored. The testing pyramid is a shape for how
much of each kind of test you want:

```
        /\
       /e2e\        few — slow, brittle, but catch real integration gaps
      /------\
     /integr. \     some — a handful of components working together
    /----------\
   /   unit     \   many — fast, isolated, pinpoint failures
  /--------------\
```

**Unit tests** check one function or class in isolation, with everything around it
faked or stubbed. They run in milliseconds, so you can have thousands of them and run
them on every save.

```ts
test("applyDiscount rejects a discount larger than the order total", () => {
  expect(() => applyDiscount(order, 10_000)).toThrow();
});
```

**Integration tests** check that a few real pieces work together — your code talking
to a real database, a real queue, a real HTTP client. Slower, because real I/O is
involved, so you write fewer of them and aim them at the seams where bugs actually
hide (a repository layer, a third-party API client).

**End-to-end tests** drive the whole system like a user would — click, submit, assert
on the result. They catch the gaps the lower layers miss (wrong wiring, a broken
build, a misconfigured environment) but they're slow and the most likely to break for
reasons that have nothing to do with a real bug. You want a small number of these,
covering the paths that would actually hurt if they broke.

The shape matters because of a tradeoff: a test's ability to catch *real* bugs tends
to go up as you move toward the top, while its speed and stability go down. A suite
that's all E2E tests is slow enough that nobody runs it locally, and flaky enough that
failures get ignored. A suite that's all unit tests can be green while the actual
system is broken, because nothing checked that the pieces fit together.

Neither extreme is "more testing." They're both the wrong shape.

## The one-line version

Test the logic that's expensive to get wrong, keep most of that testing fast and
isolated, and use the slow, broad tests sparingly — just enough to catch the gaps
between the pieces. That's it. Everything else is detail.
