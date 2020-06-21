import * as BABYLON from 'babylonjs'
import { Engine, Camera, ArcRotateCamera, Vector3, HemisphereBuilder, HemisphericLight, Mesh } from 'babylonjs';


// Get the canvas DOM element
const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
// Load the 3D engine
class Playground {
    public static CreateScene(engin: BABYLON.Engine, canvas: HTMLCanvasElement) {
        var scene = new BABYLON.Scene(engin);

        // camera
        var camera = new ArcRotateCamera("arcCamera", 0, 0, 150, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // light 
        var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);

        // creation of 3 boxes and 2 sphere
        var boxs: Mesh[] = [];
        for (let i = 0; i < 7; i++) {
            boxs[i] = Mesh.CreateBox(`box${i}`, 6, scene);
            boxs[i].position.x = (i - 3) * 10;
        }

        boxs[0].rotation.x = Math.PI/3;
        boxs[1].rotation.y = Math.PI/8;
        boxs[2].scaling.z=.2
        boxs[3].scaling.y = 2
        boxs[5].parent = boxs[3]
        boxs[6].scaling.z = 3;
        return scene;
    }
};
const engin: BABYLON.Engine = new BABYLON.Engine(canvas, true)

const scene: BABYLON.Scene = Playground.CreateScene(engin, canvas);

engin.runRenderLoop(function () {
    scene.render();
})


document.body.append(canvas);