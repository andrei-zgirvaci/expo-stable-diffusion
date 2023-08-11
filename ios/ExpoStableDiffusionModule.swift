import ExpoModulesCore
import CoreML

public class ExpoStableDiffusionModule: Module {
    private var pipeline: StableDiffusionPipeline? = nil
    private var currentStep: Int = 0
    
    public func definition() -> ModuleDefinition {
        Name("ExpoStableDiffusion")
        
        AsyncFunction("loadModel", loadModel)

        AsyncFunction("generateImage", generateImage)

        Function("getCurrentStep", getCurrentStep)
    }
    
    private func loadModel(modelPath: URL) throws {
        let config = MLModelConfiguration()
        config.computeUnits = .cpuAndNeuralEngine
            
        let pipeline = try StableDiffusionPipeline(resourcesAt: modelPath, controlNet: [], configuration: config, disableSafety: true, reduceMemory: true)
        
        self.pipeline = pipeline
        
        try pipeline.loadResources()
        
        print("Stable Diffusion Model successfully loaded from: \(modelPath)")
    }
    
    private func generateImage(prompt: String, stepCount: Int?, savePath: URL) throws {
        var config = StableDiffusionPipeline.Configuration(prompt: prompt)
        config.schedulerType = .dpmSolverMultistepScheduler
        config.stepCount = stepCount!
        self.currentStep = 0
        
        print("Generating Images with the following Config:", config)
        
        let image = try self.pipeline!.generateImages(configuration: config, progressHandler: { progress in
            print("Current Step: \(progress.step)")
            self.currentStep = progress.step
            return true
        }).first
        
        let uiImage = UIImage(cgImage: image!!)
        
        let imageData = uiImage.jpegData(compressionQuality: 1)
                
        try imageData!.write(to: savePath)
        
        print("Image Generated at: \(savePath)")
    }

    private func getCurrentStep() -> Int {
        return self.currentStep
    }
}
