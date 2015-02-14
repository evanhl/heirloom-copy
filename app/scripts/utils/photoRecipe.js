//= require ./utils

Utils.PhotoRecipe = {
  createRotateRecipe: function (angle) {
    angle = 360 - (angle % 360);

    return JSON.stringify([
      {
        "uri": "output",
        "id": 2,
        "input 0": 3,
        "format": "rgba"
      },
      {
        "uri": "rotateFrame",
        "id": 3,
        "input 0": 1,
        "output rotate": "<default>",
        "rotation": angle.toString()
      },
      {
        "uri": "ucharToFloat",
        "id": 1,
        "input 0": 0
      },
      {
        "uri": "input",
        "id": 0,
        "format": "rgba"
      }
    ]);
  }
};
