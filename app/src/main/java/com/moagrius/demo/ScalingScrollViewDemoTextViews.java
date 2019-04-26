package com.moagrius.demo;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.LinearLayout;

import com.moagrius.widget.ScalingScrollView;

/**
 * @author Mike Dunn, 2/3/18.
 */

public class ScalingScrollViewDemoTextViews extends Activity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_demos_scalingscrollview_textviews);
    ScalingScrollView scalingScrollView = findViewById(R.id.scalingscrollview);
    scalingScrollView.setShouldVisuallyScaleContents(true);
    LinearLayout linearLayout = findViewById(R.id.linearlayout);
    for (int i = 0; i < 25; i++) {
      LinearLayout row = new LinearLayout(this);
      Helpers.populateLinearLayout(row, 25);
      linearLayout.addView(row, new LinearLayout.LayoutParams(ActionBar.LayoutParams.WRAP_CONTENT, ActionBar.LayoutParams.WRAP_CONTENT));
    }
  }

}
