export function getSelectedWordForDocument(document) {
  var window = document.defaultView;

  var selection = window.getSelection();
  if (!selection.isCollapsed) {
    return selection.toString();
  }

  selection.modify("move", "forward", "character");
  selection.modify("move", "backward", "word");
  selection.modify("extend", "forward", "word");
  var t = selection.toString();
  selection.modify("move", "forward", "character"); //clear selection

  return t;
}
