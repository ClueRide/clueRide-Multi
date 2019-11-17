# Responsibilities

This module sorts out the source of Geo Location position, either 
GPS from the device, or when tethered, reads its position from 
a service that may track the group leader or other source.

- Knows how to choose a source.
- Allows forcing the tether when requested.
- Allows setting up an Observable that can be subscribed to by 
clients.
- Can handle retrieval from browser "GPS" which only returns a
single unchanging position.

## Sources
Table 

| Type | Expected Event Count | Example |
|------|---------------------|------------|
| Browser | Single unchanging | When testing on desktop browser |
| GPS     | New position as device moves around | Mobile device in the field. |
| Tether  | New positions over time | Following the Team's (Guide's) position while playing the game. |

**Tether Notes**

A tether tracks one of the following:
- a service generating a sequence of points
- another device whose position is being used as the reference.


