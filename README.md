![Release Badge](https://img.shields.io/github/release/moagrius/ScrollView.svg)

# ScrollView

<img src="https://user-images.githubusercontent.com/701344/57316752-234e3000-70bc-11e9-84ef-a89c54f04fc1.gif" />

The Android framework provides `android.widget.ScrollView` and `android.widget.HorizontalScrollView`, each providing scrolling along one axix.

`com.moagrius.widgets.ScrollView` can do either, or scroll in any direction.

It alogrithmically attempts to determine this for you, although it'd be trivial to add an API to enforce a specific behavior.  For example, if you have a content wrapped in a scrolling mechanism, whose layout features are MATCH_PARENT for width, and WRAP_CONTENT for height, you'll scroll vertically.  The inverse would scroll horizontally.  If you have content wrapped in a scrolling mechanism in a 250,000DP square, the widget would scroll in any direction.

This can be useful for large images, or table- or grid-style layouts.

## ScalingScrollView

This is a subclass of `com.moagrius.widgets.ScrollView` with additional functionality for pinch and double tap to scale.  You can allow the `ScalingScrollView` to automatically scale your content by calling `setShouldVisuallyScaleContents(true)` or you can handle the actaul output of the scale yourself by passing `false` to the same method.  For example, you might want a grid of icons that reduces the space between them but does not actually scale the icons - you'd use the latter invocation `setShouldVisuallyScaleContents(false)` for that.

## Installation

`ScrollView` is available on jcenter.  Use the gradle `implementation` function in your `build.gradle`

```
implementation 'com.moagrius:scrollview:1.0.4'
```

## Usage

The `com.moagrius.widgets.ScrollView` should be very familiar to users of `android.widget.ScrollView`.  For your convenience, there's a demo module included in this repo.  Just clone the repo, open the project in Android Studio, then hit `Run`.  The demo will play on whatever attached devices or emulators are running.  There are several examples of uses for both `ScrollView` and related classes.

## API

The API will seem almost entirely identical; the soure is taken largely from existing sources, and modified where needed.  Both `android.widget.ScrollView` and `android.widget.HorizontalScrollView` were used to come up with the base; additionally ideas were taken from my own previous work on http://github.com/moagrius/TileView, and:

1. https://android.googlesource.com/platform/frameworks/support/+/master/v7/recyclerview/src/main/java/android/support/v7/widget/RecyclerView.java
1. https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/GestureDetector.java

Additionally, there's a `ScalingScrollView` class, that reacts to pinch and double-tap gestures to handle "zooming".  It will scale it's content visually if you call `setShouldVisuallyScaleContents` and pass a parameter of `true`.  Otherwise, it will update a scale variable, but it's up to you what to do with those chnages (except for scroll boundaries - those are updated in all cases).  For example, you might want a grid of icons that reflows when scaled, but the icons themselves do not actually scale.

Of note, `ScalingScrollView` is the base class for `com.moagrius.TileView` http://github.com/moagrius/TileView, my image tiling libraray.

## Changes

There were a few pieces that did make the port a bit rockier than you might imagine.  Diagonal, for example, is an entirely new concept and foreign to both the existing widgets, although scrolling along an irregular axis is present in other components, like Google Maps.  Another exmaple would be "fading edges" - that graphic hint you've reached the end of a scroll.  While you could argue it's less likely to be useful in a omniaxis `ScrollView`, the widget might be used a drop-in replacement for the existing single-axis widgets, as originally stated.  In those cases, fading edges might certainly be appropriate, but the amount of code required to support that was signficant, and the amount of new code that would have been required to make sure that those edges didn't overlap, and played nicely with another, was even greater.  So the decison was made and the feature was sacrified, for better or worse.  Similarly, I've modified the final output for other reasons:

I've modified from the source for a few reasons:
  
 1. Anything that was required for functionality on both axes.
 2. Inaccessibility (package-private, internal, etc).
 3. There's very little left around child focus, as a 2D scroll view is likely to be a form container.
 5. Certain accessibility functions have been removed (e.g., does "scroll forward" mean down, or right?)
 6. Using a Scroller rather than an OverScroller; over-scroll seems less helpful for "panning" views than a list-type view.

You may not agree with all the decisions made, but I think if you check out the demo (built into the repo and super easy to use), you'll find the `com.moagrius.widgets.ScrollView` is not only a worthy replacement that does the job required of multiple framework-provided widgets, but also that you'll find uses that exceed the mandate of those other widgets.  For example, if you just want to pan and zoom an image or component, these classes can handle almost all of that functionality out of the box, with a familiar API and familiar behavior.  Remember that we're usign the same time ranges, pixel slops, interpolation, thresholds and qualification branching that are used currently, so you'll find that your new `ScrollView` looks, acts, and is programmed almost exactly like the others in your app, or others.

## Feedback & Contributing

As always, feedback is welcome, **as are pull requests**.  We'd love to have you spot a bug and report it properly with tons of detail and STR, but we'd love it even more if that issue came along with a thoughtful PR that fixed the problem.

If you like the widget, we're not asing for donation or credit (license is MIT), but do please pop a star on the repo so we know we're working for real people with real apps and real problems to solve.

Thanks for reading, and we hope you love ScrollView.
