import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, PointLight, Mesh, MeshBuilder, Color4, Color3, DynamicTexture } from 'babylonjs';

import * as BABYLON from 'babylonjs'


// Get the canvas DOM element
const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
// Load the 3D engine
class Playground {
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
        const scene: Scene = new Scene(engin); // define the engin to use to render Scene
        scene.clearColor = new Color4(.5, .5, .5);


        // This creates and positions a free camera (non-mesh)
        const camera: ArcRotateCamera = new ArcRotateCamera("camrea1", 0, 0, 0, new Vector3(2, 3, 4), scene);
        camera.setPosition(new Vector3(10, 3, -10));
        camera.attachControl(canvas, true);

        // lights
        var light = new HemisphericLight("light1", new Vector3(1, 0.5, 0), scene);
        light.intensity = 0.8;

        // Pilot
        const body = MeshBuilder.CreateCylinder("body",
            {
                height: 0.75,
                diameterTop: 0.2,
                diameterBottom: 0.5,
                tessellation: 6,
                subdivisions: 1,
            },
            scene
        );
        let arm = MeshBuilder.CreateBox("a",
            {
                height: 0.75,
                width: 0.3,
                depth: 0.1875,

            },
            scene
        );
        arm.position.x = 0.125;

        var pilot: any = BABYLON.Mesh.MergeMeshes([body, arm], true);

        let localOrigin = localAxes(2);
        localOrigin.parent = pilot;

        pilot.position = new Vector3(2, 3, 4);

        showAxios(8);

        function showAxios(size: number) {
            var makeTextPlane = function (text: string, color: string, size: number) {
                var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
                dynamicTexture.hasAlpha = true;
                dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
                var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
                var material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
                material.backFaceCulling = false;
                material.specularColor = new Color3(0, 0, 0);
                material.diffuseTexture = dynamicTexture;
                plane.material = material;
                return plane;
            };

            var axisX = BABYLON.Mesh.CreateLines("axisX", [
                Vector3.Zero(),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, 0.05 * size, 0),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, -0.05 * size, 0)
            ])

            var axisY = BABYLON.Mesh.CreateLines("axisY", [
                Vector3.Zero(),
                new Vector3(0, size, 0),
                new Vector3(0.05 * size, size * 0.95, 0),
                new Vector3(0, size, 0),
                new Vector3(-0.05 * size, size * 0.95, 0)
            ])
            var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
                Vector3.Zero(),
                new Vector3(0, 0, size),
                new Vector3(0.05 * size, 0, 0.95 * size),
                new Vector3(0, 0, size),
                new Vector3(-0.05 * size, 0, 0.95 * size)
            ])

            axisX.color = new Color3(1, 0, 0);
            axisY.color = new Color3(0, 1, 0);
            axisZ.color = new Color3(0, 0, 1);
            var xChar = makeTextPlane("X", "red", size / 10);
            var yChar = makeTextPlane("Y", "green", size / 10);
            var zChar = makeTextPlane("Z", "blue", size / 10);
            xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
            yChar.position = new Vector3(-0.05 * size, 0.9 * size, 0);
            zChar.position = new Vector3(-0.05 * size, 0, 0.9 * size);



        }

        function localAxes(size: number) {
            var pilot_local_axisX = Mesh.CreateLines("pilot_local_axisX", [
                Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
                new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
            ], scene);
            pilot_local_axisX.color = new Color3(1, 0, 0);

            var pilot_local_axisY = Mesh.CreateLines("pilot_local_axisY", [
                Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
                new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
            ], scene);
            pilot_local_axisY.color = new Color3(0, 1, 0);

            var pilot_local_axisZ = Mesh.CreateLines("pilot_local_axisZ", [
                Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
                new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
            ], scene);
            pilot_local_axisZ.color = new Color3(0, 0, 1);

            var local_origin = MeshBuilder.CreateBox("local_origin", { size: 1 }, scene);
            local_origin.isVisible = false;

            pilot_local_axisX.parent = local_origin;
            pilot_local_axisY.parent = local_origin;
            pilot_local_axisZ.parent = local_origin;

            return local_origin;

        }

        return scene

    }
};
const engin: Engine = new Engine(canvas, true)

const scene: Scene = Playground.CreateScene(engin, canvas);

engin.runRenderLoop(function () {
    scene.render();
})


document.body.append(canvas);