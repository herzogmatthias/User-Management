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
    http.send(JSON.stringify({ newPath: $("#inputPath").val() }));
    http.onreadystatechange = e => {
      if (http.readyState == 4 && http.status == 200) {
        $("#partial").replaceWith($(e.srcElement.response).find("#partial"));
      }
    };
  });
});
