# Responsibilities

This Service works on a single given course at a time.

To map between the Path representation in a Course to the
ordered list of Attractions.

- Maintain an ordered list of Attractions for the Course.
- Map from Path IDs to the ordered list (perhaps just read from the back-end for initialization).
- Map from the ordered list to Path IDs -- or representative gaps when the
Path is not yet defined. 
- Tell whether there are missing elements:
  - Path without an ID from back-end.
  - Path without an Edge yet assigned.
  
# Approach

Portions are still TBD.

- Presentation of existing Courses first; Constructing new list of Attractions second.


