import { List } from 'immutable'

export const HANDLED_KEYS = List<string>(["a", "z", "e", "r", "t", "y", "u"])
// export const HANDLED_KEYS = List<string>(["h", "j", "k", "l", "m"])

export const NB_TILE_COLUMNS = 5
export const NB_VISIBLE_TILES = 7


////////////////////
// DESIGN

// Colors

export const TILE_COLORS = ["#49F03A", "#FF3535", "#FFE50E", "#3070FF", "#FFA60E"]

// Dimensions

export const TILE_WIDTH = 60
export const MARGIN = 5

// Animation

export const ANIMATION_TIME = 50
export const TRANSITION_STEPS = 5

