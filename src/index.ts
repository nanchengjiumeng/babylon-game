import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, PointLight, Mesh, MeshBuilder } from 'babylonjs';

// Get the canvas DOM element
const canvas: HTMLCanvasElement = document.querySelector('#canvas');
// Load the 3D engine
class Playground {
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
        const scene: Scene = new Scene(engin); // define the engin to use to render Scene

        // This creates and positions a free camera (non-mesh)
        const camera: ArcRotateCamera = new ArcRotateCamera("camrea1", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, -10), scene);

        camera.setTarget(Vector3.Zero());

        camera.attachControl(canvas, true);

        const light: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        const light2: PointLight = new PointLight("light2", new Vector3(0, 0, 0), scene);

        light.intensity = 0.7;

        // const  sphere = Mesh.CreateSphere("aphere1", 16, 2, scene);

        // sphere.position.y = 1;

        // const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

        // const box = Mesh.CreateBox("box1", 1, scene);1

        // const box = MeshBuilder.CreateBox("box2", {
        //     height: 2,
        //     width: 2,
        //     depth: 2,
        // }, scene)

        // const sphere = MeshBuilder.CreateSphere("sphere1", {
        //     diameterX: 1,
        //     diameterY: 0.1,
        //     diameterZ: 1,
        // }, scene)

        // const plane = MeshBuilder.CreatePlane("plane", {
        //     width:5,
        //     height:2
        // }, scene)

        // const ground = MeshBuilder.CreateGround("g1",{
        //     width:5,
        //     height:5,
        //     subdivisions: 40
        // })

        var myPoints = [];

        var deltaTheta = 0.1;
        var deltaY = 0.005;

        var radius = 1;
        var theta = 0;
        var Y = 0;
        for (var i = 0; i < 400; i++) {
            myPoints.push(new Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
            theta += deltaTheta;
            Y += deltaY
        }

        let lines = MeshBuilder.CreateDashedLines("lines", { points: myPoints, updatable: true, dashNb: myPoints.length }, scene)

        setTimeout(() => {
            lines = MeshBuilder.CreateLines("lines", {
                points: [
                    new Vector3(0, 0, 0),
                    new Vector3(0, 1, 1),
                    new Vector3(0, 1, 0)
                ], 
                instance: lines
            });
        }, 3000)

        return scene

    }
};
const engin: Engine = new Engine(canvas, true)

const scene: Scene = Playground.CreateScene(engin, canvas);

engin.runRenderLoop(function () {
    scene.render();
})


document.body.append(canvas);