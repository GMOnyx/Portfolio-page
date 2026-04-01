import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2012',
    title: 'Maz International School',
    subtitle: '2012 – 2022',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022',
    title: 'Jeddah Prep & Grammar',
    subtitle: 'IGCSEs  •  2022 – 2024',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2024',
    title: 'GEMS Metropole School',
    subtitle: 'A-Levels  •  2024 – Now',
    position: 'right',
  },
  {
    point: new THREE.Vector3(1, 1, -10),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: 'Next chapter...',
    position: 'left',
  },
]
