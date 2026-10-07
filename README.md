My Personal Website
This is the source code for my personal website, built with HTML, CSS, and Jekyll data files.

The pages with Jekyll front matter use explicit `permalink` values to preserve their `.html` URLs. Keep these values when changing page content; the global permalink configuration otherwise publishes them under directory URLs.

The homepage follows Home → Research → Experience → Publications. Its Research section uses `_data/research_topics.yml` for short topic descriptions and figures. These four navigation links scroll within the homepage; All Projects, Resume, and Personal Corner are separate destinations. Personal Corner contains favorites and the bucket list.

`projects.html` contains every project, with expandable methods, results, and media for the current research projects. Summaries and resource links are in `_data/projects.yml`. Older research and individual-project links redirect to the homepage research section or the corresponding catalog entry. The technical stack is in `_data/technical_stack.yml`.

`Resume_Robotics.pdf` is the resume linked throughout the site. The SO-101 video is an optimized version of the existing hardware demo from https://github.com/acharjee07/lerobot-mujoco-kinematics/blob/master/docs/hardware_vis.gif.

The floorplan figure is `files/FloorplanImage.png`. The scene-graph example is Figure 3 of the author’s public preprint: https://arxiv.org/html/2511.13970v1/figs/scene_graph_example.png.

TwinSplat media in `files/twinsplat/` comes from https://github.com/acharjee07/twinsplat at commit `462b943efcaff1c5db30827602b26b3a372d236f`. The GIFs are original rendered project outputs; PNG posters are still frames for pause controls and reduced-motion preferences.
