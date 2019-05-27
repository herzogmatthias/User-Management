function deletePath(e) {
  const url = window.location.origin + "/deletePath/" + e.id;
  $.get(url).then(data => {
    const tmp = $(data);
    const newContent = tmp.find("#partial");
    $("#partial").replaceWith(newContent);
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
        console.log(e);
        const tmp = $(e.srcElement.response);
        const newContent = tmp.find("#partial");
        $("#partial").replaceWith(newContent);
      }
    };
  });
  $(".fa-stack").click(e => {
    console.log(e);
    console.log("I was clicked");
  });
});
