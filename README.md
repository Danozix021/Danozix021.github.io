# Daniel Achkar Portfolio

Static site for GitHub Pages. No build step: edit the files and push.

## Structure

```
index.html            Home: intro, featured projects, contact
projects.html         All projects, with filters
about.html            Bio, education, skills
<project-slug>/       One folder per project (index.html inside)
_template/            Copy this to start a new project page (not published)
assets/js/projects.js The project list: titles, details, tags, videos
assets/js/site.js     Builds the header, footer, cards and project details
assets/css/style.css  All styling
assets/img/           Thumbnails and screenshots (one folder per project)
assets/video/         Video files, if you don't use YouTube
```

## Add a project

1. Copy `_template` and rename the copy to the project's slug, e.g. `flower-delivery`.
2. In the new `index.html`, change `data-slug="SLUG-HERE"` to `data-slug="flower-delivery"`.
3. Add an entry to `assets/js/projects.js` with the same slug.
4. Replace the grey "To add" boxes with your content.

The project then appears on the Projects page, gets previous/next buttons,
and shows on the home page if `featured: true`.

## Add a video or thumbnail

In `projects.js`, set `video` to a YouTube link (or a path like
`assets/video/witch-doctor.mp4`) and `thumbnail` to an image path like
`assets/img/witch-doctor/thumb.jpg`.

## Publish on GitHub Pages

1. Create a repository named `Danozix021.github.io`.
2. Upload everything in this folder to it.
3. In the repository's Settings > Pages, set the source to the `main` branch.
4. The site goes live at https://danozix021.github.io/ within a few minutes.
