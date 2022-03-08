package com.techo.mapbox;

import android.Manifest;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.plugin.WebView;
import com.mapbox.geojson.Point;
import com.mapbox.maps.CameraOptions;
import com.mapbox.maps.MapInitOptions;
import com.mapbox.maps.MapOptions;
import com.mapbox.maps.MapView;
import com.mapbox.maps.ResourceOptions;
import com.mapbox.maps.Style;

@CapacitorPlugin(name = "Mapboxsdk",
  permissions = {
    @Permission(
      strings = { Manifest.permission.ACCESS_FINE_LOCATION },
      alias = "geolocation"
    ),
    @Permission(strings = { Manifest.permission.INTERNET }, alias = "internet"),
  })
public class MapboxsdkPlugin extends Plugin {
  private MapView mapView;
  Integer mapViewParentId;
  Integer DEFAULT_WIDTH = 500;
  Integer DEFAULT_HEIGHT = 500;
  Float DEFAULT_ZOOM = 12.0f;
  private Mapboxsdk implementation = new Mapboxsdk();
  @PluginMethod
  public void echo(PluginCall call) {
    String value = call.getString("value");
    JSObject ret = new JSObject();
    ret.put("value", implementation.echo(value));
    call.resolve(ret);
  }
  @PluginMethod
  public void create(PluginCall call) {
    final Integer width = call.getInt("width", DEFAULT_WIDTH);
    final Integer height = call.getInt("height", DEFAULT_HEIGHT);
    final Integer x = call.getInt("x", 0);
    final Integer y = call.getInt("y", 0);
    final Float zoom = call.getFloat("zoom", DEFAULT_ZOOM);
    final Double latitude = call.getDouble("latitude");
    final Double longitude = call.getDouble("longitude");
    final String accessToken = call.getString("accessToken");
    getBridge().getActivity().runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (mapViewParentId != null){
          View viewToRemove = ((ViewGroup) getBridge().getWebView().getParent()).findViewById(mapViewParentId);
          if (viewToRemove != null){
            ((ViewGroup) getBridge().getWebView().getParent()).removeViewInLayout(viewToRemove);
          }
        }
        FrameLayout mapViewParent = new FrameLayout(getBridge().getContext());
        mapViewParentId = View.generateViewId();
        mapViewParent.setId(mapViewParentId);
        ResourceOptions resOpt = new ResourceOptions.Builder().accessToken(accessToken)
          .build();
        CameraOptions initialCameraOptions = new CameraOptions.Builder()
          .center(Point.fromLngLat(longitude, latitude))
          .pitch(45.0)
          .zoom(Double.valueOf(zoom))
          .bearing(-17.6)
          .build();
        Context ctx = getBridge().getContext();
        MapInitOptions ops = new MapInitOptions(ctx,resOpt);
        ops.setCameraOptions(initialCameraOptions);
        mapView = new MapView(ctx,ops);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(getScaledPixels(width), getScaledPixels(height));
        lp.topMargin = getScaledPixels(y);
        lp.leftMargin = getScaledPixels(x);
        mapView.setLayoutParams(lp);
        mapViewParent.addView(mapView);
        ((ViewGroup) getBridge().getWebView().getParent()).addView(mapViewParent);
      }
    });
    call.resolve();
  }
  @PluginMethod()
  public void close(PluginCall call) {
    getBridge().executeOnMainThread(new Runnable() {
      @Override
      public void run() {
        if (mapViewParentId != null){
          View viewToRemove = ((ViewGroup) getBridge().getWebView().getParent()).findViewById(mapViewParentId);
          if (viewToRemove != null){
            ((ViewGroup) getBridge().getWebView().getParent()).removeViewInLayout(viewToRemove);
          }
        }
      }
    });
  }
  public int getScaledPixels(float pixels) {
    // Get the screen's density scale
    final float scale = getBridge().getActivity().getResources().getDisplayMetrics().density;
    // Convert the dps to pixels, based on density scale
    return (int) (pixels * scale + 0.5f);
  }
}
