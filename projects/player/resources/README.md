These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/

## Specific Notes for this Project
The splash screen files are having trouble loading into GitHub, so
this defines the procedure for building those resources. We can't just
check them out of GitHub and have them be in the right spot.

At this time, the artwork is maintained in a Gimp file (xcf format) and
a base `splash.png` is exported from that file. The generated file
with compression is still about 9-10Mb. The size is largely due to 
the 3642x2732 image size that `ionic cordova resources` command likes
to see before it will work.

I've tried additional compression (taking it through JPEG first) and 
breaking the commit into smaller pieces, but nothing seemed to work.

Once you export the `.xcf` into a `.png` within this directory,\
run the `ionic cordova resources` command and then you can run
a `--prod` build to put the app on the device (or to just 
generate the `.apk`).
