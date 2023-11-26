// Generated file. To retain edits, remove this comment.

import {
  BinaryFile,
  JsonCompatible,
  Mesh,
  InterfaceTypes,
  PipelineOutput,
  PipelineInput,
  runPipeline
} from 'itk-wasm'

import WasmZtdReadMeshOptions from './wasm-ztd-read-mesh-options.js'
import WasmZtdReadMeshResult from './wasm-ztd-read-mesh-result.js'

import { getPipelinesBaseUrl } from './pipelines-base-url.js'
import { getPipelineWorkerUrl } from './pipeline-worker-url.js'

/**
 * Read a mesh file format and convert it to the itk-wasm file format
 *
 * @param {File | BinaryFile} serializedMesh - Input mesh serialized in the file format
 * @param {WasmZtdReadMeshOptions} options - options object
 *
 * @returns {Promise<WasmZtdReadMeshResult>} - result object
 */
async function wasmZtdReadMesh(
  webWorker: null | Worker | boolean,
  serializedMesh: File | BinaryFile,
  options: WasmZtdReadMeshOptions = {}
) : Promise<WasmZtdReadMeshResult> {

  const desiredOutputs: Array<PipelineOutput> = [
    { type: InterfaceTypes.JsonCompatible },
    { type: InterfaceTypes.Mesh },
  ]

  let serializedMeshFile = serializedMesh
  if (serializedMesh instanceof File) {
    const serializedMeshBuffer = await serializedMesh.arrayBuffer()
    serializedMeshFile = { path: serializedMesh.name, data: new Uint8Array(serializedMeshBuffer) }
  }
  const inputs: Array<PipelineInput> = [
    { type: InterfaceTypes.BinaryFile, data: serializedMeshFile as BinaryFile },
  ]

  const args = []
  // Inputs
  const serializedMeshName = (serializedMeshFile as BinaryFile).path
  args.push(serializedMeshName)

  // Outputs
  const couldReadName = '0'
  args.push(couldReadName)

  const meshName = '1'
  args.push(meshName)

  // Options
  args.push('--memory-io')
  if (typeof options.informationOnly !== "undefined") {
    options.informationOnly && args.push('--information-only')
  }

  const pipelinePath = 'wasm-ztd-read-mesh'

  const {
    webWorker: usedWebWorker,
    returnValue,
    stderr,
    outputs
  } = await runPipeline(webWorker, pipelinePath, args, desiredOutputs, inputs, { pipelineBaseUrl: getPipelinesBaseUrl(), pipelineWorkerUrl: getPipelineWorkerUrl() })
  if (returnValue !== 0 && stderr !== "") {
    throw new Error(stderr)
  }

  const result = {
    webWorker: usedWebWorker as Worker,
    couldRead: outputs[0]?.data as JsonCompatible,
    mesh: outputs[1]?.data as Mesh,
  }
  return result
}

export default wasmZtdReadMesh
