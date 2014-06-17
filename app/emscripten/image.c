#include <SDL/SDL.h>
// #include <malloc.h>

void setUint8(uint8_t* arr, int index, int16_t val) {
  if (val > 255) {
    val = 255;
  } else if (val <= 0) {
    val = 0;
  }
  arr[index] = val;
}

int modConvolution(uint8_t* rgba, uint8_t* rgba_out, int w, int h, int8_t* matrix, int denominator) {
  int matrixCenterX = 1;
  int matrixCenterY = 1;
  int hSkip, vSkip, i, j, k, len;
  int16_t channelPixelVal, origVal;

  len = w * h * 4;

  hSkip = 4;
  vSkip = w * 4;

  for (i = 0; i < len; ++i) {
    if ((i % 4) != 3) {
      channelPixelVal = 0;

      for (j = 0; j <= 2; j++) {
        for (k = 0; k <= 2; k++) {

          origVal = (rgba[i + (hSkip * (j - matrixCenterX)) + (vSkip * (k - matrixCenterY))] * (matrix[(j * 3) + k]) / denominator);
          channelPixelVal += origVal;
        }
      }

      setUint8(rgba_out, i, channelPixelVal);
    } else {
      rgba_out[i] = rgba[i];
    }
  }

  return matrix[0];
}


uint8_t modSaturation(uint8_t* rgba, int w, int h, float saturation) {
  int len, i, gOffset, bOffset;
  int16_t newVal;
  float invSaturation, luminance;

  invSaturation = 1.0f - saturation;

  len = w * h * 4;

  for (i = 0; i < len; ++i) {
    if (i % 4 == 0) {
      gOffset = i + 1;
      bOffset = i + 2;

      luminance = (rgba[i] + rgba[gOffset] + rgba[bOffset]) / 3;

      setUint8(rgba, i, (luminance * (invSaturation)) + (rgba[i] * saturation));
      setUint8(rgba, gOffset, (luminance * (invSaturation)) + (rgba[gOffset] * saturation));
      setUint8(rgba, bOffset, (luminance * (invSaturation)) + (rgba[bOffset] * saturation));
    }
  }

  return rgba[i];
}



