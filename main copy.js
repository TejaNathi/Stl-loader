

//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

// Create scene
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.120.1/build/three.module.js';
import * as Oribtcontrols from"https://cdn.jsdelivr.net/npm/three@0.114/examples/js/controls/OrbitControls.js"
import Stats from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/libs/stats.module.min.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/STLLoader.js';
//import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const loader = new STLLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
camera.position.set(0,10, 100);
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
// Add a plane to the scene
const planeGeometry = new THREE.PlaneGeometry(100, 100,10,10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, wireframe: true });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
plane.position.y = 0; // Adjust the position of the plane
scene.add(plane);
const faceIndex = 0; // You can change this index based on your requirements
const faceNormal = new THREE.Vector3();
planeGeometry.faces[faceIndex].normal.clone(faceNormal);
// const materialFront = new THREE.MeshBasicMaterial({ color: 0xff0000  }); // Red
// const materialBack = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green
// const materialTop = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue
// const materialBottom = new THREE.MeshBasicMaterial({ color: 0xffff00}); // Yellow
// const materialLeft = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Magenta
// const materialRight = new THREE.MeshBasicMaterial({ color: 0x00ffff}); // Cyan

// // Create a MultiMaterial by combining the materials
// const multiMaterial = new THREE.MultiMaterial([
//     materialFront,
//     materialBack,
//     materialTop,
//     materialBottom,
//     materialLeft,
//     materialRight
// ]);

// //var controls = new THREE.OrbitControls( camera, renderer.domElement );
const controls = new THREE.OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true;
// // Create a cube geometry
// const geometry = new THREE.BoxBufferGeometry(10, 30, 10);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, multiMaterial);
// scene.add(cube);

// const bufferGeometry =cube.geometry;
// bufferGeometry.computeFaceNormals();

// // Compute vertex normals
// bufferGeometry.computeVertexNormals();

// // Log the normals of the cube
// // function normalsupdates(cubegeomerty){
// //     const faces =cubegeomerty.attributes.normal.Array;

// // // Array to store normals
// // const normals = [];

// // // Iterate through the faces and get the normals
// // for (let i = 0; i < faces.length; i++) {
// //     normals.push(faces[i].normal);
// // }
// // console.log("normals",normals);
// // }

// function findUpFaces(geometry, threshold = 0.1) {
//     const upFaces = [];

//     // Iterate through faces to find those with normals approximately matching (0, 1, 0)
//     for (let i = 0; i < geometry.faces.length; i++) {
//         const faceNormal = geometry.faces[i].normal;
//         if (Math.abs(faceNormal.x) < threshold && faceNormal.y > 1 - threshold && Math.abs(faceNormal.z) < threshold) {
//             upFaces.push(i);
//         }
//     }

//     return upFaces;
// }
// function getFaceNormals(geometry, faceIndex) {
//     const normals = geometry.attributes.normal.array;
//     const startIndex = faceIndex * 6;  // Corrected indexing for BufferGeometry

//     // For a BufferGeometry, each normal is represented by three components (x, y, z)
//     const normal = new THREE.Vector3( normals[startIndex],normals[startIndex + 1], normals[startIndex + 2]);

//     // Assuming y is up, no need to switch y and z components
//     return normal;
// }




// let xAxisLine, yAxisLine, zAxisLine;
// function createAxesLines(mesh) {
//     // Extract the columns of the mesh matrix (local coordinate axes)
//     const xAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(0, 3));
//     const yAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(4, 7));
//     const zAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(8, 11));

//     // Remove existing lines if they exist
//     if (xAxisLine) scene.remove(xAxisLine);
//     if (yAxisLine) scene.remove(yAxisLine);
//     if (zAxisLine) scene.remove(zAxisLine);

//     // Create lines along the local coordinate axes
//     xAxisLine = new THREE.ArrowHelper(xAxis, mesh.position, 20, 0xff0000);
//     yAxisLine = new THREE.ArrowHelper(yAxis, mesh.position, 20, 0x00ff00);
//     zAxisLine = new THREE.ArrowHelper(zAxis, mesh.position, 20, 0x0000ff);

//     // Add the lines to the scene
//     scene.add(xAxisLine);
//     scene.add(yAxisLine);
//     scene.add(zAxisLine);
// }
// createAxesLines(cube)

// function updateNormalsAfterRotation(cube) {
//     // Assuming three components (x, y, z) per normal
//     const normals = cube.geometry.attributes.normal.array;

//     // Iterate through each face of the cube
//     for (let i = 0; i < normals.length; i += 3) { // Updated the increment to 3
//         const normal = new THREE.Vector3(normals[i], normals[i + 1], normals[i + 2]);

//         // Apply quaternion to the normal
//         normal.applyQuaternion(cube.quaternion);

//         // Update the normal values in the buffer
//         normals[i] = normal.x;
//         normals[i + 1] = normal.y;
//         normals[i + 2] = normal.z;
//     }

//     // Notify Three.js that normals are updated
//     cube.geometry.attributes.normal.needsUpdate = true;
//     cube.updateMatrixWorld();
// }




// function getFaceIndexWithNormal(cube, threshold = 0.01) {
//     const normals = cube.geometry.attributes.normal.array;
//     const quaternion = cube.quaternion.clone();

//     // Transform the target normal {0, 1, 0} using the quaternion
//     const targetNormal = new THREE.Vector3(0, -1, 0).applyQuaternion(quaternion);

//     // Find the face index with the closest normal to the transformed target normal
//     let closestFaceIndex = -1;
//     let minAngle = Infinity;

//     for (let i = 0; i < normals.length; i += 3) {
//         const normal = new THREE.Vector3(normals[i], normals[i + 1], normals[i + 2]);

//         // Apply quaternion to the normal
//         normal.applyQuaternion(quaternion);

//         // Calculate the angle between the target normal and the current normal
//         const angle = targetNormal.angleTo(normal);

//         // Update the closest face index if the current angle is smaller and within the threshold
//         if (angle < minAngle && angle < threshold) {
//             minAngle = angle;
//             closestFaceIndex = i / 9; // Convert index to face index
//         }
//     }

//     return closestFaceIndex;
// }







// console.log("buffer",bufferGeometry);
// //normalsupdates(bufferGeometry);

// // Assuming you have a mesh with BufferGeometry


// // Check if the geometry is BufferGeometry and has the position attribute
// if (bufferGeometry.isBufferGeometry && bufferGeometry.attributes) {
//     const positionAttribute = bufferGeometry.attributes.position;
//     const positionArray = positionAttribute.array;

//     // Assuming the item size is 3 (common for position)
//     const itemSize = positionAttribute.itemSize;

//     // Access individual components of the position attribute
//     for (let i = 0; i < positionAttribute.count; i++) {
//         const xPos = positionArray[i * itemSize];
//         const yPos = positionArray[i * itemSize + 1];
//         const zPos = positionArray[i * itemSize + 2];

//         // Do something with the individual components...
//     }
// } else {
//     console.error("Position attribute not found in BufferGeometry.");
// }



// let isDragging = false;
// let previousMouseX = 0;

// // Event listeners for mouse move and mouse down/up
// document.addEventListener('mousedown', onMouseDown);
// document.addEventListener('mousemove', onMouseMove);
// document.addEventListener('mouseup', onMouseUp);

// function onMouseDown(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Update the raycaster
//     raycaster.setFromCamera(mouse, camera);

//     // Check for intersections
//     const intersects = raycaster.intersectObject(cube);
//    // console.log("intersects",intersects);
//     //isDragging = true;
//    // previousMouseX = event.clientX;

//     if (intersects.length > 0) {
//         const selectedfaces=intersects[0].faceIndex;
//         console.log("faceindex",selectedfaces);
//         const normal=getFaceNormals(bufferGeometry,selectedfaces)
//         console.log("normals", normal);updateNormalsAfterRotation(cube);

//        controls.enabled=false;

//         // Log the normal of the selected face
    
//         isDragging = true;


// }}

// function onMouseMove(event) {
//     if (isDragging) {
//         const deltaX = event.clientX - previousMouseX;
       
//         controls.enabled=false;

//     //    normalsupdates(cube.geometry);

//         // Rotate the cube around its y-axis by a small amount
//         cube.rotation.z += deltaX * (Math.PI / 180); // Adjust this factor for sensitivity

//         // Check for snapping angles (90, 180, 270 degrees)
//         const angle = cube.rotation.z * (180 / Math.PI);

//        // console.log("angles",angle);

//         if (angle % 90 < 5 || angle % 90 > 85) {
//             // Snap to the nearest 90-degree angle
//             cube.rotation.z = Math.round(angle / 90) * (Math.PI / 2);
//            // cube.updateMatrixWorld();
           
//            updateNormalsAfterRotation(cube);
           
            
          
//         }
//         controls.enabled=false;
//         createAxesLines(cube);
        
//         // Update previous mouse position
//         previousMouseX = event.clientX;

//     }
   
// }

// function onMouseUp() {
 
//     isDragging = false;
//     updateNormalsAfterRotation(cube);
//     const yup= getFaceIndexWithNormal(cube);
//     console.log("yup",yup);
//     controls.enabled=true;
//     console.log("cube",cube.geometry.attributes);
//     //updateNormalsAfterRotation(cube);
   
  
// }
// Or, if the above doesn't work, try:
// console.log("Cube Normals:", cubeGeometry.attributes.normals.array);


window.addEventListener('resize', (event) => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
window.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
let selectedFaceIndex = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.getElementById('fileInput').addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
    const file = event.target.files[0];
    let meshes=null;
    let geometrys =null;

    if (file) {
        const loader = new STLLoader();
        loader.load(URL.createObjectURL(file), function (geometry) {
    const material = new THREE.MeshNormalMaterial();
     meshes = new THREE.Mesh(geometry, material);
    meshes.position.set(0, 0, 0);
    scene.add(meshes);
    fileInput.value = '';
    geometrys =meshes.geometry
    
        });}

    // Handle mouse click to select face
   // window.removeEventListener('click', onMouseClick);
    // Add the click event listener
   window.addEventListener('click', onMouseClick, false);
    

    function onMouseClick(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(meshes);

        if (intersects.length > 0) {
            selectedFaceIndex = intersects[0].faceIndex;
            console.log('Selected Face Index:', selectedFaceIndex);
            findAllNeighboringFaces(geometrys, selectedFaceIndex);
            
            var neigbourface = findAllNeighboringFaces(geometrys, selectedFaceIndex);
            console.log("facess", neigbourface);
          // const singlenormal= computeAverageNormal(geometry,neigbourface);

         //  console.log("singlenormal",singlenormal);
         //  const centroids = computeCentroid(geometry, neigbourface, meshes);
         //  const averageNormal = computeAverageNormal(geometry,  neigbourface);
         //  const planeMesh = createPlaneMesh(averageNormal, 10, 0x00ff00, centroids);
         //  scene.add(planeMesh);
           


            const selectedFaceNormal = getFaceNormal(geometrys, selectedFaceIndex);
            console.log("gotfacenormal",selectedFaceNormal);
            
           
            const filteredNormals = filterNormalsBySelectedFace(geometrys, selectedFaceNormal, neigbourface);
           // console.log('Filtered Normals:', filteredNormals);
            highlightFilteredNormals(geometrys, selectedFaceIndex, filteredNormals);
            const normalss = getFaceNormal(geometrys,selectedFaceIndex);
const angless= isAngleInSet(normalss, angleSet)
console.log("angles",angless);
        }
    }


    function computeCentroid(geometrys, faceIndices, mesh) {
        const centroids = faceIndices.map(faceIndex => {
            const position = getFacePositions(geometrys, faceIndex, mesh);
            const normal = getFaceNormal(geometrys, faceIndex);
    
            // Log for debugging
            //console.log(`Face Index: ${faceIndex}, Position: ${JSON.stringify(position)}, Normal: ${JSON.stringify(normal)}`);
    
            return position;
        });
    
        const centroid = new THREE.Vector3();
        centroids.forEach(point => centroid.add(point));
    
        centroid.divideScalar(centroids.length);
    
        // Log for debugging
    //    console.log(`Final Centroid: ${JSON.stringify(centroid)}`);
    
        return centroid;
    }
    

    
    function createPlaneMesh(normal, size, color, centroids) {
        // Check if centroids array is empty
        if (centroids.length === 0) {
            console.error('Centroids array is empty');
            return null; // Or handle the error in an appropriate way
        }
    
        // Remove undefined elements from centroids array
        const validCentroids = centroids.filter(centroid => centroid !== undefined);
    
        // Check if there are valid centroids after filtering
        if (validCentroids.length === 0) {
            console.error('No valid centroids in the array');
            return null; // Or handle the error in an appropriate way
        }
    
        // Calculate the average centroid
        const averageCentroid = validCentroids.reduce((sum, centroid) => sum.add(centroid), new THREE.Vector3()).divideScalar(validCentroids.length);
    
        // Create a plane geometry
        const planeGeometry = new THREE.PlaneGeometry(size, size);
    
        // Create a material
        const planeMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    
        // Create the plane mesh
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    
        // Set the position of the plane based on the average centroid
        planeMesh.position.copy(averageCentroid);
    
        // Align the plane with the average normal
        const up = new THREE.Vector3(0, 1, 0); // or any other vector not parallel to the normal
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal.clone().normalize());
        planeMesh.quaternion.copy(quaternion);
    
        return planeMesh;
    }
    
    
    

    function computeAverageNormal(geometrys, faceIndices) {
        const normal = new THREE.Vector3();
    
        for (const faceIndex of faceIndices) {
            const faceNormal = getFaceNormal(geometrys, faceIndex);
            normal.add(faceNormal);
        }
    
        normal.divideScalar(faceIndices.length).normalize();
    
        return normal;
    }
    

    function findAllNeighboringFaces(geometry, selectedFaceIndex) {
        const faces = geometry.attributes.position.count / 3;
        const neighbors = [];
        const selectedVertices = getFaceVertices(geometry, selectedFaceIndex);
    
        for (let i = 0; i < faces; i++) {
            if (i !== selectedFaceIndex) {
                const vertices = getFaceVertices(geometry, i);
                if (areVerticesInSamePlane(selectedVertices, vertices)) {
                    neighbors.push(i);
                }
            }
        }
    
       // console.log("neighbours", neighbors);
        return neighbors;
    }
    let isDragging = false;
    let isrotating=false

// Offset between intersection point and click position
const dragOffset = new THREE.Vector3();

let isRotationEventAttached = false;

document.getElementById('rotationButton').addEventListener('click', function () {

    if (!isRotationEventAttached) {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        isRotationEventAttached = true;
    } else {
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        isRotationEventAttached = false;
        
    }
});



let previousMousePosition = {
    x: 0,
    y: 0
};
// Disable OrbitControls on mousedown if ray intersects the mesh
function onMouseDown(event) {
    event.preventDefault();

    // Set mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObject(meshes);

    if (intersects.length > 0) {
        isrotating = true;
        isDragging=false

        // Calculate the offset between intersection point and click position
        dragOffset.copy(intersects[0].point).sub(meshes.position);

        // Disable OrbitControls
        controls.enabled = false;
    }
}


// Move the mesh on mousemove if dragging
function onMouseMove(event) {
    event.preventDefault();

    if (isrotating) {
        // Update the mouse coordinates
        const currentMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    
        const deltaX = currentMousePosition.x - previousMousePosition.x;
    
        // Step 4: Apply Rotation
        meshes.rotation.y += deltaX * 0.01; 
        
        meshes.verticesNeedUpdate=true
        meshes.normalsNeedUpdate=true;
       
        meshes.updateMatrixWorld();
        let transformationMatrixss = new THREE.Matrix4().copy(meshes.matrix);
       console.log("mesh matrix",transformationMatrixss);

    
        // Update previous mouse position
        previousMousePosition = currentMousePosition;
    }
}

// Enable OrbitControls on mouseup
function onMouseUp() {
    isrotating = false;

    // Enable OrbitControls
    controls.enabled = true;
}



document.addEventListener('mousedown',  onobject);
        document.addEventListener('mousemove', onobjectmove);
        document.addEventListener('mouseup', onup);


function onobject(event) {
    event.preventDefault();

    // Set mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObject(meshes);

    if (intersects.length > 0) {
        isDragging = true;

        // Calculate the offset between intersection point and click position
        dragOffset.copy(intersects[0].point).sub(meshes.position);

        // Disable OrbitControls
        controls.enabled = false;
    }
}


// Move the mesh on mousemove if dragging
function onobjectmove(event) {
    event.preventDefault();
    

        if (isDragging) {
            // Update the mouse coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Update the raycaster
            raycaster.setFromCamera(mouse, camera);
    
            // Raycast to find the intersection point
            const intersects = raycaster.intersectObject(meshes);
    
            if (intersects.length > 0) {
                // Update only the X and Z components of the mesh's position
                meshes.position.x = intersects[0].point.x - dragOffset.x;
                meshes.position.z = intersects[0].point.z - dragOffset.z;
            
        }}
}

// Enable OrbitControls on mouseup
function onup() {
    isDragging = false;

    // Enable OrbitControls
    controls.enabled = true;
}





    
   
 //  highlightFilteredNormals(geometry, 33, neigbourfacesss  );

    
    function areVerticesInSamePlane(vertices1, vertices2) {
        const threshold = 0.001; // Adjust the threshold based on your model
        const plane = new THREE.Plane().setFromCoplanarPoints(vertices1[0], vertices1[1], vertices1[2]);
        return vertices2.every(vertex => Math.abs(plane.distanceToPoint(vertex)) < threshold);
    }
    
    
    // Function to get the vertices of a face
    function getFaceVertices(geometry, faceIndex) {
        const positions = geometry.attributes.position.array;
        const startIndex = faceIndex * 9;
        return [
            new THREE.Vector3(positions[startIndex], positions[startIndex + 1], positions[startIndex + 2]),
            new THREE.Vector3(positions[startIndex + 3], positions[startIndex + 4], positions[startIndex + 5]),
            new THREE.Vector3(positions[startIndex + 6], positions[startIndex + 7], positions[startIndex + 8]),
        ];
    }
    

const mergedPositions = [];
    
    let mergedMesh=null;
    let mergedarraynormals=[];
    let mergedarray=[];

    
   
    function highlightFilteredNormals(geometry, selectedFaceIndex, filteredNormals) {
        const positions = geometry.attributes.position.array;
        const normals = geometry.attributes.normal.array;
    
        let mergedNormals = [];
       // createAxesLines(meshes);
    
        // Add the selected face to the merged geometry
        const selectedFaceStart = selectedFaceIndex * 9;
        const selectedFaceEnd = selectedFaceStart + 9;
        mergedPositions.push(...positions.slice(selectedFaceStart, selectedFaceEnd));
        mergedNormals.push(...normals.slice(selectedFaceStart, selectedFaceEnd));
    
        // Extract positions and normals of selected and filtered neighboring faces
        filteredNormals.forEach((faceIndex) => {
            const startIndex = faceIndex * 9;
            const endIndex = startIndex + 9;
    
            const facePositions = positions.slice(startIndex, endIndex);
            const faceNormals = normals.slice(startIndex, endIndex);
    
            if (!containsNaN(facePositions) && !containsNaN(faceNormals)) {
                mergedPositions.push(...facePositions);
                mergedNormals.push(...faceNormals);
            }
        });
    
        // Create a new BufferGeometry for the merged faces
        const mergedGeometry = new THREE.BufferGeometry();
        mergedGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(mergedPositions), 3)
        );
        mergedGeometry.setAttribute(
            'normal',
            new THREE.BufferAttribute(new Float32Array(mergedNormals), 3)
        );
    
        // Calculate a single normal for the merged faces
        
        

    
        // Create a mesh with the merged geometry
        const mergedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
         
        // Add the merged mesh to the scene
        scene.add(mergedMesh);
    
    
    mergedarray.push(mergedMesh);
    mergedarraynormals.push(mergedNormals);
    
    let maxLength = 0;
    let longestMeshIndex = -1;

    for (let i = 0; i < mergedarray.length; i++) {
        const normalsArray = mergedarray[i].geometry.getAttribute('normal').array;
      //  console.log(`Normals for Mesh ${i + 1}:`, normalsArray.length);
        let normils = normalsArray[i];
      //  console.log("normils", normils);
         normalSum = new THREE.Vector3(); // Initialize outside the loop to accumulate all normals

        for (let i = 0; i < mergedarray.length; i++) {
            const normalsArray = mergedarray[i].geometry.getAttribute('normal').array;
           // console.log(`Normals for Mesh ${i + 1}:`, normalsArray.length);
        
            // Sum up all normals
            for (let j = 0; j < normalsArray.length; j += 3) {
                const normal = new THREE.Vector3(normalsArray[j], normalsArray[j + 1], normalsArray[j + 2]);
                normalSum.add(normal);
            }
        
            if (normalsArray.length > maxLength) {
                maxLength = normalsArray.length;
                longestMeshIndex = i;
            }
        }
        
     // console.log(`Mesh with the longest normals is at index ${longestMeshIndex} with length ${maxLength}`);
        
        // Normalize the sum to get the average normal
        normalSum.normalize();
       //console.log("Combined Face Normal:", normalSum);
    }}

let normalSum=null;
let isMouseDownEventAttached = false;

document.getElementById('layflat').addEventListener('click', function () {

    if (!isMouseDownEventAttached) {
        document.addEventListener('mousedown', onMouseClicksss, false);
        isMouseDownEventAttached = true;
    } else {
        document.removeEventListener('mousedown', onMouseClicksss, false);
        isMouseDownEventAttached = false;
    }
});
// const neigbourfacesss = findAllNeighboringFaces(geometry, 58);
//    console.log("negia",neigbourfacesss);


    function calculateMeshDimensions(mesh) {
        const geometry = mesh.geometry;
        const positions = geometry.attributes.position.array;
    
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
    
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
    
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
    
        const length = maxX - minX;
        const width = maxY - minY;
    
        return { length, width };
    }
    
// Helper function to check for NaN values in an array
function containsNaN(array) {
    for (let i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            return true;
        }
    }
    return false;
}



function mergeMeshesIntoSingleMesh(meshes) {
    const mergedGeometry = new THREE.BufferGeometry();
    const mergedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    const mergedPositions = [];
    const mergedNormals = [];

    meshes.forEach((mesh) => {
        const positions = mesh.geometry.getAttribute('position').array;
        const normals = mesh.geometry.getAttribute('normal').array;

        mergedPositions.push(...positions);
        mergedNormals.push(...normals);
    });

    mergedGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mergedPositions), 3));
    mergedGeometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(mergedNormals), 3));

    // Create a mesh with the merged geometry and material
    const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
    return mergedMesh;
}   

function getFaceNormal(geometry, faceIndex) {
        const normals = geometry.attributes.normal.array;
        const startIndex = faceIndex * 9;
       
        return new THREE.Vector3(normals[startIndex], normals[startIndex + 1], normals[startIndex + 2]);
       
    }

    // Function to filter neighboring faces based on normals using dot product
    function filterNormalsBySelectedFace(geometry, selectedFaceNormal, neighboringFaces) {
        return neighboringFaces.filter(neighboringFaceIndex => {
            const neighboringFaceNormal = getFaceNormal(geometry, neighboringFaceIndex);
            // Normalize the vectors before computing the dot product
            selectedFaceNormal.normalize();
            neighboringFaceNormal.normalize();
            // Compare normals using the dot product
            const dotProduct = selectedFaceNormal.dot(neighboringFaceNormal);
            // You can adjust the threshold based on your requirements
            const threshold = 0.999; // Cosine of a small angle (e.g., 2 degrees)
            return dotProduct > threshold;
        });
  }
  function getFaceVerticess(geometry, faceIndex) {
    const vertices = [];

    if (geometry instanceof THREE.BufferGeometry) {
        // Handle BufferGeometry
        const positions = geometry.attributes.position.array;
        const startIndex = faceIndex * 9;
        for (let i = 0; i < 9; i += 3) {
            vertices.push(
                new THREE.Vector3(positions[startIndex + i], positions[startIndex + i + 1], positions[startIndex + i + 2])
            );
        }
    } else if (geometry instanceof THREE.Geometry) {
        // Handle Geometry (deprecated in newer Three.js versions)
        const face = geometry.faces[faceIndex];
        const verticesIndices = [face.a, face.b, face.c];
        verticesIndices.forEach(index => {
            const vertex = geometry.vertices[index];
            vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
        });
    } else {
        // Handle other geometry types as needed
        // You might need additional checks for different geometry types
    }

    return vertices;
}

const initialBoundingBox = new THREE.Box3().setFromObject(meshes);

// Create a wireframe box to represent the bounding box
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
const wireframeGeometry = new THREE.BoxGeometry();
const boundingBoxWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
scene.add(boundingBoxWireframe);

// Function to update the bounding box based on the mesh
function updateBoundingBox(mesh) {
    // Update the bounding box wireframe based on the current state of the mesh
    yourMesh.updateMatrixWorld(); // Ensure the matrixWorld is up to date

    // Extract the vertices of the initial bounding box
    const vertices = initialBoundingBox.clone().applyMatrix4(mesh.matrixWorld).toArray();

    // Update the bounding box wireframe vertices
    for (let i = 0; i < boundingBoxGeometry.vertices.length; i++) {
        boundingBoxGeometry.vertices[i].fromArray(vertices, i * 3);
    }

    boundingBoxGeometry.verticesNeedUpdate = true;
}

let transformationMatrixss =null;

function onMouseClicksss(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshes);

    if (intersects.length > 0) {
        selectedFaceIndex = intersects[0].faceIndex;
        console.log('Selected Face Index:', selectedFaceIndex);
        const beforroation=  getFacePositions(geometry, selectedFaceIndex, meshes);
       console.log("beforerotationface",beforroation);
        
       meshes.rotation.set(0, 0, 0);
        let selectedFaceNormals =getFaceNormal(geometry, selectedFaceIndex);
        console.log('Selected Face Normals:', selectedFaceNormals);
    const   angles = isAngleInSet( selectedFaceNormals, angleSet)
    console.log("angless",angles);
   // singlemeshes.updateMatrixWorld();
      //  let boxmatrixss=planes.matrix.identity();
       // console.log("boxesmatrixss",boxmatrixss);
        let rotationMatrix = calculateRotationMatrix(selectedFaceNormals, constantPlaneNormal);
       
       
        let transformationMatrixss = new THREE.Matrix4().copy(meshes.matrix);
       console.log("mesh matrix",transformationMatrixss);
    
   //console.log("singlmesh".singlemesh);

    
        // Multiply the mesh matrix with the rotation matrix
     const combinedMatrix = new THREE.Matrix4().multiplyMatrices( transformationMatrixss,rotationMatrix);
        // Apply the new rotation to the existing matrix
    geometry.applyMatrix4(combinedMatrix);
     meshes.updateMatrixWorld();
    const afeterrotation=  getFacePositions(geometry, selectedFaceIndex, meshes);
    geometry.normalsNeedUpdate = true;
    transformationMatrixss = new THREE.Matrix4().copy(meshes.matrix);
    console.log("afterrotationmatrix",transformationMatrixss);

    let transformation = calculateTransformationMatrixs(selectedFaceIndex,plane, meshes,afeterrotation);
    const combinedMatrixs = new THREE.Matrix4().multiplyMatrices( transformationMatrixss,transformation);
    geometry.applyMatrix4(combinedMatrixs);
    meshes.updateMatrixWorld();
    transformationMatrixss = new THREE.Matrix4().copy(meshes.matrix);
   
    }
}

let xAxisLine, yAxisLine, zAxisLine;
function createAxesLines(mesh) {
    // Extract the columns of the mesh matrix (local coordinate axes)
    const xAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(0, 3));
    const yAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(4, 7));
    const zAxis = new THREE.Vector3().fromArray(mesh.matrix.elements.slice(8, 11));

    // Remove existing lines if they exist
    if (xAxisLine) scene.remove(xAxisLine);
    if (yAxisLine) scene.remove(yAxisLine);
    if (zAxisLine) scene.remove(zAxisLine);

    // Create lines along the local coordinate axes
    xAxisLine = new THREE.ArrowHelper(xAxis, mesh.position, 10, 0xff0000);
    yAxisLine = new THREE.ArrowHelper(yAxis, mesh.position, 10, 0x00ff00);
    zAxisLine = new THREE.ArrowHelper(zAxis, mesh.position, 10, 0x0000ff);

    // Add the lines to the scene
    scene.add(xAxisLine);
    scene.add(yAxisLine);
    scene.add(zAxisLine);
}

function calculateTransformationMatrixs(faceIndex, planeMesh, mesh,facePosition) {
    // Ensure geometry is updated
    mesh.geometry.computeBoundingBox();
    mesh.updateMatrixWorld();
    const planeNormal = planeMesh.geometry.faces[0].normal.clone().applyQuaternion(planeMesh.quaternion);
    const planePosition = planeMesh.position;

    // Calculate the vector from the face position to a point on the plane
    const vectorToPlane = new THREE.Vector3().subVectors(facePosition, planePosition);

    // Project the vector onto the plane's normal to find the distance to the plane
    const distanceToPlane = (vectorToPlane.dot(planeNormal))*2;
    console.log("distanceto the plane",distanceToPlane);

    // Get the vertices of the selected face
    const faceVertices = getFaceVertices(mesh.geometry, faceIndex);

    // Calculate the center of the face
    const faceCenter = new THREE.Vector3();
    faceVertices.forEach((vertex) => faceCenter.add(vertex));
    faceCenter.divideScalar(faceVertices.length);

    // Create a translation matrix to move the object's origin to the face center and then move up to the top of the plane
    const translationMatrix = new THREE.Matrix4().makeTranslation(
        -faceCenter.x,
        faceCenter.y + distanceToPlane,
        -faceCenter.z
    );

    return translationMatrix;
}
function getFacePositions(geometry, faceIndex, mesh) {
    const positions = geometry.attributes.position.array;
    const startIndex = faceIndex * 3 * 3;

    // Calculate the average position of the vertices to get the face position in local coordinates
    const localPosition = new THREE.Vector3();
    for (let i = 0; i < 3; i++) {
        const index = startIndex + i * 3;
        const x = positions[index];
        const y = positions[index + 1];
        const z = positions[index + 2];

        localPosition.add(new THREE.Vector3(x, y, z));
    }
    localPosition.divideScalar(3);
    //console.log("local",localPosition);
    

    // Convert the local face position to global coordinates by applying the mesh's matrixWorld
    const globalPosition = localPosition.clone().applyMatrix4(mesh.matrixWorld);
 //   console.log("meshworld",mesh.matrixWorld);

    return globalPosition;
}

function selectOuterFacesAutomatically(geometry) {
    const faces = geometry.attributes.position.count / 3;
    const selectedFaces = new Set();
    const excludedFaces = new Set();

    const processFace = (faceIndex) => {
        if (!excludedFaces.has(faceIndex)) {
            const neighbors = findAllNeighboringFaces(geometry, faceIndex);

            neighbors.forEach(neighborIndex => {
                excludedFaces.add(neighborIndex); // Exclude neighbors from future iterations
            });

            const normal = getFaceNormal(geometry, faceIndex);
            const thresholdMin = 0.2; // Adjust this threshold based on your requirements
            const thresholdMax = 1;

            // Check if the absolute values are within the range [0.9, 1.1]
            if (
                Math.abs(normal.x) >= thresholdMin && Math.abs(normal.x) <= thresholdMax ||
                Math.abs(normal.y) >= thresholdMin && Math.abs(normal.y) <= thresholdMax ||
                Math.abs(normal.z) >= thresholdMin && Math.abs(normal.z) <= thresholdMax
            ) {
                selectedFaces.add(faceIndex);
            }
            neighbors.forEach(processFace); // Recursively process neighbors
        }
    };

    // Start processing faces from the beginning
    for (let i = 0; i < faces; i++) {
        processFace(i);
    }

    return Array.from(selectedFaces);

}
const selectedOuterFaces = selectOuterFacesAutomatically(geometry);
console.log("Selected Outer Faces:", selectedOuterFaces);
 
function selectLayFlatFacesWithNormals(geometry, selectedOuterFaces, angleSet) {
    const flatfaces = {};

    selectedOuterFaces.forEach(selectedFaceIndex => {
        const selectedFaceNormal = getFaceNormal(geometry, selectedFaceIndex);

        // Check if the face normal is within the specified angle set
        const result =isAngleInSet(selectedFaceNormal, angleSet);
        if (result.isInSet) {
            const angles = result.angle;
            const direction = getDirectionLabel(selectedFaceNormal);

            // Initialize the angles entry if it doesn't exist
            if (!flatfaces[angles]) {
                flatfaces[angles] = {};
            }

            // Initialize the direction entry if it doesn't exist
            if (!flatfaces[angles][direction]) {
                flatfaces[angles][direction] = {
                    normals: [],
                    faceIndices: []
                };
            }

            // Add the current normal and face index to the direction entry
            flatfaces[angles][direction].normals.push(selectedFaceNormal);
            flatfaces[angles][direction].faceIndices.push(selectedFaceIndex);
        }
    });

    return flatfaces;
}

function getDirectionLabel(normal, threshold = 0.99, thresholdmin=0.2,thresholdMax=0.9) {
    const epsilon = 1e-6; // A small value to handle rounding errors

    if (normal.x > threshold) {
        return 'x';
    } else if (normal.x < -threshold) {
        return '-x';
    } else if (normal.y > threshold) {
        return 'y';
    } else if (normal.y < -threshold) {
        return '-y';
    } else if (normal.z > threshold) {
        return 'z';
    } else if (normal.z < -threshold) {
        return '-z';
    } else if (Math.abs(normal.x) < epsilon && Math.abs(normal.y) < epsilon) {
        return 'z'; // xy plane
    } else if (Math.abs(normal.x) < epsilon && Math.abs(normal.z) < epsilon) {
        return 'y'; // xz plane
    } else if (Math.abs(normal.y) < epsilon && Math.abs(normal.z) < epsilon) {
        return 'x'; // yz plane
    } else if (Math.abs(normal.x) < epsilon && Math.abs(normal.y) < threshold && Math.abs(normal.z) < threshold) {
        return 'xy'; // plane between x and y
    } else if (Math.abs(normal.x) < threshold && Math.abs(normal.y) < epsilon && Math.abs(normal.z) < threshold) {
        return 'xz'; // plane between x and z
    } else if (Math.abs(normal.x) < threshold && Math.abs(normal.y) < threshold && Math.abs(normal.z) < epsilon) {
        return 'yz'; // plane between y and z
    } else if (
        Math.abs(normal.x)  >= thresholdmin &&  Math.abs(normal.x)  <= thresholdMax,
        Math.abs(normal.y)  >= thresholdmin &&  Math.abs(normal.y)  <= thresholdMax,
        Math.abs(normal.y)  >= thresholdmin &&  Math.abs(normal.y)  <= thresholdMax
    ) {
       
        return 'xyz'; // Zero in all directions
    } else {
        return 'unknown';
    }
}



const epsilon = 1e-6; // A small value to handle rounding errors
function isAngleInSet(normal, angleSet) {
    // Ensure the normal vector is normalized
    const length = Math.sqrt(normal.x ** 2 + normal.y ** 2 + normal.z ** 2);
    const normalizedNormal = {
        x: normal.x / length,
        y: normal.y / length,
        z: normal.z / length,
    };

    // Calculate the angle in radians using atan2, considering all three components
    const angle = Math.atan2(normalizedNormal.y, normalizedNormal.x, normalizedNormal.z);


    // Convert the angle to degrees and ensure it's within [0, 360] degrees
    let degrees = (angle * 180) / Math.PI;
    
    degrees = (degrees + 360) % 360;
   // console.log("degree",degrees);

    // Adjust for negative angles
    if (degrees < 0) {
        degrees += 360;
    }

    // Round the angle to the nearest integer
    degrees = Math.round(degrees);

    const isInSet = angleSet.includes(degrees);

   
    return { angle: degrees, isInSet };
}

const angleSet = [0, 45, 90, 70,135, 180,225,270,360,315];

const selectedLayFlatFacesss = selectLayFlatFacesWithNormals(geometry,selectedOuterFaces,angleSet );
console.log("Combined Selected Faces:", selectedLayFlatFacesss);

const facesss=  getFacePositions(geometry,1070, meshes);

console.log("afterrotation",facesss);

function findFarthestFaces(selectedFacesWithNormals, geometry, mesh) {
        const farthestFaces = {};
    
        for (const direction in selectedFacesWithNormals) {
            if (Object.hasOwnProperty.call(selectedFacesWithNormals, direction)) {
                const directionData = selectedFacesWithNormals[direction];
    
                let positiveDistance = -Infinity;
                let negativeDistance = Infinity;
                let farthestPositiveFace = null;
                let farthestNegativeFace = null;
    
                for (let i = 0; i < directionData.faceIndices.length; i++) {
                    const faceIndex = directionData.faceIndices[i];
                    const facePosition = getFacePositions(geometry, faceIndex, mesh);
    
                    let distance;
    
                    switch (direction) {
                        case 'x':
                        case '-x':
                            distance = facePosition.x;
                            break;
                        case 'y':
                        case '-y':
                            distance = facePosition.y;
                            break;
                        case 'z':
                        case '-z':
                            distance = facePosition.z;
                            break;
                        case 'xy':
                            distance = Math.sqrt(facePosition.x ** 2 + facePosition.y ** 2);
                            break;
                        case 'xz':
                            distance = Math.sqrt(facePosition.x ** 2 + facePosition.z ** 2);
                            break;
                        case 'yz':
                            distance = Math.sqrt(facePosition.y ** 2 + facePosition.z ** 2);
                            break;
                        // Add more cases for other directions as needed
                    }
    
                    // Update the farthest face for positive and negative distances
                    if (distance !== undefined) {
                        if (distance > positiveDistance) {
                            positiveDistance = distance;
                            farthestPositiveFace = faceIndex;
                        }
    
                        if (distance < negativeDistance) {
                            negativeDistance = distance;
                            farthestNegativeFace = faceIndex;
                        }
                    }
                }
    
                // Determine the overall farthest face based on the maximum absolute distance
                if (Math.abs(positiveDistance) > Math.abs(negativeDistance)) {
                    farthestFaces[direction] = farthestPositiveFace;
                } else {
                    farthestFaces[direction] = farthestNegativeFace;
                }
            }
        }
    
        return farthestFaces;
    }
    
    
//const farthestFaces = findFarthestFaces(selectedLayFlatFacesss, geometry,meshes);

//console.log("Farthest Faces:", farthestFaces);

let singlemeshes=null;

let negibourefaces = [];

function selectedNeighbours(farthestFaces, geometry) {
    for (const direction in farthestFaces) {
        if (Object.hasOwnProperty.call(farthestFaces, direction)) {
            const farthestFaceIndex = farthestFaces[direction];
            const neighbors = findAllNeighboringFaces(geometry, farthestFaceIndex);
            //const farthestFaceNormal = getFaceNormal(geometry, farthestFaceIndex);
            highlightFilteredNormals(geometry, farthestFaceIndex, neighbors);
             
        }
    }
    singlemeshes = mergeMeshesIntoSingleMesh(mergedarray);
            scene.add(singlemeshes);
            singlemeshes.position.copy(meshes.position);
singlemeshes.quaternion.copy(meshes.quaternion);
}
//console.log("mesd",singlemeshes);
//selectedNeighbours(farthestFaces, geometry);
function getFacePosition(geometry, faceIndex) {
    const vertices = getFaceVertices(geometry, faceIndex);

    // Calculate the average position of the vertices to get the face position
    const position = {
        x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
        y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3,
        z: (vertices[0].z + vertices[1].z + vertices[2].z) / 3,
    };

    return position;
}

function getFaceNormals(geometry, faceIndex) {
    const normal = new THREE.Vector3();

    // Get the vertices of the face
    const vertices = getFaceVerticess(geometry, faceIndex);
    console.log(vertices);

    if (vertices.length >= 3) {
        // Calculate the face normal using the cross product of two edges
        const edge1 = new THREE.Vector3().subVectors(vertices[1], vertices[0]);
        const edge2 = new THREE.Vector3().subVectors(vertices[2], vertices[0]);

        // Ensure the vertices form a valid face (at least three vertices)
        normal.crossVectors(edge1, edge2).normalize();
    }


    return normal;
}

const constantPlaneNormal = new THREE.Vector3(0, -1, 0); // Replace with your constant plane normal

function calculateRotationMatrix(selectedFaceNormal, constantPlaneNormal) {
    const axis = new THREE.Vector3().crossVectors(selectedFaceNormal, constantPlaneNormal).normalize();
    console.log(" axis",axis );
   

    const angle =Math.acos(selectedFaceNormal.dot(constantPlaneNormal) / (selectedFaceNormal.length() * constantPlaneNormal.length()));
   


    // Ensure axis is consistently pointing away from the constant plane normal
    
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis, angle);

    return rotationMatrix;
}

}



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();