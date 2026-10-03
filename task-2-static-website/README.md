# Task 2 — Coffee Shop Static Website

## Objective

Host the provided coffee shop website as a static website using Amazon S3.

## Website Files

The provided website contains:

* `index.html`
* `style.css`
* `script.js`

The original files are located in the `coffe-shop` directory.

## Steps Completed

### 1. Created an S3 Bucket

I created a new S3 bucket specifically for hosting the coffee shop website.

### 2. Uploaded the Website Files

I uploaded the following files directly into the S3 bucket:

* `index.html`
* `style.css`
* `script.js`

### 3. Enabled Static Website Hosting

I enabled static website hosting in the S3 bucket properties.

The index document was configured as:

```text
index.html
```

### 4. Configured Public Access

The bucket was configured to allow public read access to the website objects using an S3 bucket policy.

### 5. Tested the Website

I opened the S3 website endpoint in a web browser.

The coffee shop website loaded successfully, confirming that the static website hosting configuration was working.

## Evidence

Screenshots documenting the deployment are stored in:

`task-2-static-website/screenshots/`

## Result

The coffee shop website was successfully hosted as a static website using Amazon S3 and was accessible through the S3 website endpoint.
