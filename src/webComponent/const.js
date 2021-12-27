import _ from "lodash";

export const CellContents = {
  EMPTY: 0,
  CROSS: 1,
  CIRCLE: 2,
};

export const initialGrid = _.range(9).map((index) => {
  return {
    id: index,
    image: CellContents.EMPTY,
    shine: false,
  };
});
