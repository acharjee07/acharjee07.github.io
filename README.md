My Personal Website
This is the source code for my personal website, built with HTML, CSS, and Jekyll data files.

The pages with Jekyll front matter use explicit `permalink` values to preserve their `.html` URLs. Keep these values when changing page content; the global permalink configuration otherwise publishes them under directory URLs.

Project detail pages are under `projects/` and use the shared `_layouts/project.html` layout. Project cards and links are defined in `_data/projects.yml`; the compact technical stack is in `_data/technical_stack.yml`.

`Resume_Robotics.pdf` is the resume linked throughout the site. The SO-101 video is an optimized version of the existing hardware demo from https://github.com/acharjee07/lerobot-mujoco-kinematics/blob/master/docs/hardware_vis.gif.
