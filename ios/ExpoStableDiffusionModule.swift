import ExpoModulesCore
import CoreML

public class ExpoStableDiffusionModule: Module {
    private var pipeline: StableDiffusionPipeline? = nil
    
    public func definition() -> ModuleDefinition {
        Name("ExpoStableDiffusion")
        
        AsyncFunction("loadModel", loadModel)

        AsyncFunction("generateImage", generateImage)
    }
    
    private func loadModel(modelPath: String) throws {
        let resourcesAt = URL(fileURLWithPath: modelPath)
        
        let config = MLModelConfiguration()
        config.computeUnits = .cpuAndNeuralEngine
            
        let pipeline = try StableDiffusionPipeline(resourcesAt: resourcesAt, controlNet: [], configuration: config, disableSafety: true, reduceMemory: true)
        
        self.pipeline = pipeline
        
        try pipeline.loadResources()
        
        print("Stable Diffusion Model successfully loaded from: \(resourcesAt)")
    }
    
    private func generateImage(prompt: String, stepCount: Int?, savePath: String) throws {
        var config = StableDiffusionPipeline.Configuration(prompt: prompt)
        config.schedulerType = .dpmSolverMultistepScheduler
        config.stepCount = stepCount!
        
        print("Generating Images with the following Config:", config)
        
        let image = try self.pipeline!.generateImages(configuration: config, progressHandler: { progress in
            print("Current Step: \(progress.step)")
            return true
        }).first
        
        let uiImage = UIImage(cgImage: image!!)
        
        let imageData = uiImage.jpegData(compressionQuality: 1)
        
        let saveImagePath = URL(fileURLWithPath: savePath)
        
        try imageData!.write(to: saveImagePath)
        
        print("Image Generated at: \(saveImagePath)")
    }
}
