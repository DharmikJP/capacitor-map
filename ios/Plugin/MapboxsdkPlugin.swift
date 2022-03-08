import Foundation
import Capacitor
import MapboxMaps

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(MapboxsdkPlugin)
public class MapboxsdkPlugin: CAPPlugin, LocationPermissionsDelegate {
    var mapViewController: MapView!;
    var DEFAULT_ZOOM: Double = 12.0;
    @objc func create(_ call: CAPPluginCall) {
            DispatchQueue.main.async {
                let myResourceOptions = ResourceOptions(accessToken: call.getString("accessToken"))
                let cameraOptions = CameraOptions(center: CLLocationCoordinate2D(latitude: call.getDouble("latitude") ?? 0.0, longitude: call.getDouble("longitude") ?? 0.0),zoom: call.getDouble("zoom") ?? (self.DEFAULT_ZOOM),bearing: -17.6,pitch: 45)
                let myMapInitOptions = MapInitOptions(resourceOptions: myResourceOptions, cameraOptions:cameraOptions)
                self.mapViewController = MapView(frame: CGRect.init(x: call.getDouble("x") ?? 0, y: call.getDouble("y") ?? 0, width: call.getDouble("width") ?? 500, height: call.getDouble("height") ?? 500), mapInitOptions: myMapInitOptions)
                self.mapViewController.location.delegate = self
                self.bridge?.viewController?.view.addSubview(self.mapViewController)
            }
            call.resolve([
                "created": true
            ])
        }
    
    @objc func close(_ call: CAPPluginCall) {
            DispatchQueue.main.async {
                if self.mapViewController != nil {
                    self.mapViewController = nil
                }
            }
            call.resolve([
                "mapViewClosed" : true
            ])
        }
}
