#import "NSImageView+AFNetworking.h"
#import <objc/runtime.h>
#import "AFHTTPRequestOperation.h"

#pragma mark -

@interface NSImageView (_AFNetworking)
@property (readwrite, nonatomic, strong, setter = af_setImageRequestOperation:) AFHTTPRequestOperation *af_imageRequestOperation;
@end

@implementation NSImageView (_AFNetworking)

+ (NSOperationQueue *)af_sharedImageRequestOperationQueue {
    static NSOperationQueue *_af_sharedImageRequestOperationQueue = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _af_sharedImageRequestOperationQueue = [[NSOperationQueue alloc] init];
        _af_sharedImageRequestOperationQueue.maxConcurrentOperationCount = NSOperationQueueDefaultMaxConcurrentOperationCount;
    });
    
    return _af_sharedImageRequestOperationQueue;
}

- (AFHTTPRequestOperation *)af_imageRequestOperation {
    return (AFHTTPRequestOperation *)objc_getAssociatedObject(self, @selector(af_imageRequestOperation));
}

- (void)af_setImageRequestOperation:(AFHTTPRequestOperation *)imageRequestOperation {
    objc_setAssociatedObject(self, @selector(af_imageRequestOperation), imageRequestOperation, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

#pragma mark -

@implementation NSImageView (AFNetworking)

#pragma mark -

- (id <AFURLResponseSerialization>)imageResponseSerializer {
    static id <AFURLResponseSerialization> _af_defaultImageResponseSerializer = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _af_defaultImageResponseSerializer = [AFImageResponseSerializer serializer];
    });
    
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgnu"
    return objc_getAssociatedObject(self, @selector(imageResponseSerializer)) ?: _af_defaultImageResponseSerializer;
#pragma clang diagnostic pop
}

- (void)setImageResponseSerializer:(id <AFURLResponseSerialization>)serializer {
    objc_setAssociatedObject(self, @selector(imageResponseSerializer), serializer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

#pragma mark -

- (void)setImageWithURL:(NSURL *)url {
    [self setImageWithURL:url placeholderImage:nil];
}

- (void)setImageWithURL:(NSURL *)url
       placeholderImage:(NSImage *)placeholderImage
{
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request addValue:@"image/*" forHTTPHeaderField:@"Accept"];
    
    [self setImageWithURLRequest:request placeholderImage:placeholderImage success:nil failure:nil];
}

- (void)setImageWithURLRequest:(NSURLRequest *)urlRequest
              placeholderImage:(NSImage *)placeholderImage
                       success:(void (^)(NSURLRequest *request, NSHTTPURLResponse *response, NSImage *image))success
                       failure:(void (^)(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error))failure
{
    [self cancelImageRequestOperation];
    
    if (placeholderImage) {
        self.image = placeholderImage;
    }
    
    __weak __typeof(self)weakSelf = self;
    self.af_imageRequestOperation = [[AFHTTPRequestOperation alloc] initWithRequest:urlRequest];
    self.af_imageRequestOperation.responseSerializer = self.imageResponseSerializer;
    [self.af_imageRequestOperation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        __strong __typeof(weakSelf)strongSelf = weakSelf;
        if ([[urlRequest URL] isEqual:[strongSelf.af_imageRequestOperation.request URL]]) {
            if (success) {
                success(urlRequest, operation.response, responseObject);
            } else if (responseObject) {
                strongSelf.image = responseObject;
            }
            
            if (operation == strongSelf.af_imageRequestOperation){
                strongSelf.af_imageRequestOperation = nil;
            }
        }
        
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        __strong __typeof(weakSelf)strongSelf = weakSelf;
        if ([[urlRequest URL] isEqual:[strongSelf.af_imageRequestOperation.request URL]]) {
            if (failure) {
                failure(urlRequest, operation.response, error);
            }
            
            if (operation == strongSelf.af_imageRequestOperation){
                strongSelf.af_imageRequestOperation = nil;
            }
        }
    }];
    
    [[[self class] af_sharedImageRequestOperationQueue] addOperation:self.af_imageRequestOperation];
}

- (void)cancelImageRequestOperation {
    [self.af_imageRequestOperation cancel];
    self.af_imageRequestOperation = nil;
}

@end
