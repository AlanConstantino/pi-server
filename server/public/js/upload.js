async function deleteFileFromServer(file) {
  let url = `${location.origin}/deleteFile`;

  if (window.location.search !== undefined && window.location.search !== '') {
    url += `/${window.location.search}`;
  }

  const options = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(file)
  };

  const response = await fetch(url, options);
  return response;
}

// dropzone config
Dropzone.options.dropzoneArea = {
  paramName: 'uploaded-files',
  addRemoveLinks: true,
  maxFilesize: null,
  removedfile: async function (file) {
    // sends DELETE request to server to remove file
    const response = await deleteFileFromServer({ 'fileName': file.name });
    const serverMessage = await response.text();

    if (response.status === 200) {
      location.reload();
      return alert(serverMessage);
    }

    if (response.status === 400) {
      alert(serverMessage);
    }

    // deletes reference to dropzone thumbnail
    let _ref;
    return ((_ref = file.previewElement) != null) ? _ref.parentNode.removeChild(file.previewElement) : void 0;
  },
  // default upload message
  dictDefaultMessage: 'Drop file(s) here or click to upload',
  // default removal link text
  dictRemoveFile: 'Remove',
  init: function () {
    this.hiddenFileInput.setAttribute('webkitdirectory', true);
  },
  headers: {
    path: window.location.search
  }
};

const url = (route) => `${location.origin}${route}`;

// when you click on the go back button, you go to the '/home' url route
const goBackButton = document.getElementById('go-back-btn');
goBackButton.addEventListener('click', () => {
  const [ , path ] = window.location.href.split('?path=');
  window.location.href = url(path);
});
