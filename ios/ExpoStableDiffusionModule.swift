import ExpoModulesCore
import CoreML

public class ExpoStableDiffusionModule: Module {
    private var pipeline: StableDiffusionPipeline? = nil
    
    public func definition() -> ModuleDefinition {
        Name("ExpoStableDiffusion")
        
        Events("onStepChange")
        
        AsyncFunction("loadModel", loadModel)
        
        AsyncFunction("unloadModel", unloadModel)
        
        AsyncFunction("generateImage", generateImage)
    }
    
    private func loadModel(modelPath: URL) throws {
        let config = MLModelConfiguration()
        config.computeUnits = .cpuAndNeuralEngine
        
        let pipeline = try StableDiffusionPipeline(resourcesAt: modelPath, controlNet: [], configuration: config, disableSafety: true, reduceMemory: true)
        try pipeline.loadResources()
        self.pipeline = pipeline
        
        print("Model successfully loaded from: \(modelPath)")
    }
    
    private func unloadModel() throws {
        self.pipeline?.unloadResources()
        
        print("Model successfully unloaded")
    }
    
    private func generateImage(prompt: String, stepCount: Int?, savePath: URL) throws {
        guard let pipeline = self.pipeline else {
            throw NSError(domain: "ExpoStableDiffusionModule", code: 1, userInfo: [NSLocalizedDescriptionKey: "Pipeline not loaded"])
        }
        
        var config = StableDiffusionPipeline.Configuration(prompt: prompt)
        config.schedulerType = .dpmSolverMultistepScheduler
        config.stepCount = stepCount!
        // config.targetSize = 384
        // config.seed = 10
        
        print("Generating Images with the following Config:", config)
        
        let images = try pipeline.generateImages(configuration: config, progressHandler: { progress in
            sendEvent("onStepChange", ["step": progress.step])
            print("Current Step: \(progress.step)")
            return true
        })
        
        guard let cgImage = images.first else {
            print("No images were generated.")
            return
        }
        
        let uiImage = UIImage(cgImage: cgImage!)
        
        guard let imageData = uiImage.jpegData(compressionQuality: 1.0) else {
            print("Could not convert UIImage to JPEG data.")
            return
        }
        
        do {
            try imageData.write(to: savePath)
            print("Saved image at \(savePath)")
        } catch {
            print("Error saving image at \(savePath): \(error)")
        }
    }
}
