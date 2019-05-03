![Release Badge](https://img.shields.io/github/release/moagrius/ScrollView.svg)

# ScrollView

In Android, you have `android.widget.ScrollView` and `android.widget.HorizontalScrollView`, one for use for scrolling content across one axis.

This is fine, and will suit your needs in the great majority of circumstances.  That said, the program could probably figure out and deliver what you need based on other configuration variables.  For example, if you have a content wrapped in a scrolling mechanism, whose layout features are MATCH_PARENT for width, and WRAP_CONTENT for height, that's almost always going to mean scroll vertically.  The inverse is true as well.  If you have content wrapped in a scrolling mechanism in a 250,000DP square, it's probably going to need to scroll along both axis, and sometimes diagonally.

Our goal was to provide a single widget that made made these decisions algorithmically.  The result is `com.moagriu.widgets.ScrollView`.

## API

The API will seem almost entirely identical; the soure is taken largely from existing sources, and modified where needed.  Both `android.widget.ScrollView` and `android.widget.HorizontalScrollView` were used to come up with the base; additionally ideas were taken from my own previous work on http://github.com/moagrius/TileView, and:

1. https://android.googlesource.com/platform/frameworks/support/+/master/v7/recyclerview/src/main/java/android/support/v7/widget/RecyclerView.java
1. https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/GestureDetector.java

Additionally, there's a `ScalingScrollView` class, that reacts to pinch and double-tap gestures to handle "zooming".  It will scale it's content visually if you call `setShouldVisuallyScaleContents` and pass a parameter of `true`.  Otherwise, it will update a scale variable, but it's up to you what to do with those chnages (except for scroll boundaries - those are updated in all cases).  For example, you might want a grid of icons that reflows when scaled, but the icons themselves do not actually scale.

Of note, `ScalingScrollView` is the base class for `com.moagrius.TileView`, a faily popular image tiling libraray.

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
