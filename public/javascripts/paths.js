function deletePath(e) {
  console.log(e);
  const url = window.location.origin + "/deletePath/" + e.id;
  $.get(url).then(data => {
    $("#partial").replaceWith($(data).find("#partial"));
  });
}
$(document).ready(function() {
  $("#newPathButton").click(() => {
    const http = new XMLHttpRequest();
    const url = window.location.origin + "/newPath";

    http.open("POST", url);
    http.setRequestHeader("content-type", "application/json");
    http.send(JSON.stringify({ name: $("#inputPath").val(), read: true, write: false }));
    http.onreadystatechange = e => {
      if (http.readyState == 4 && http.status == 200) {
        $("#partial").replaceWith($(e.srcElement.response).find("#partial"));
      }
    };
  });
});
function updatePath(e) {
  const id = e.id.split('_')[0];
  const type = e.id.split('_')[1]
  console.log(e.id);
  const url = window.location.origin + "/updatePath/" + id + '?checked='+ e.value + '&type=' + type;
  $.get(url).then(data => {
    $("#partial").replaceWith($(data).find("#partial"));
  });
}
