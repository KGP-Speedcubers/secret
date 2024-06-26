import { writable } from "svelte/store";
import type { timeList } from "../types/types";

export let Times = writable<timeList>([]);