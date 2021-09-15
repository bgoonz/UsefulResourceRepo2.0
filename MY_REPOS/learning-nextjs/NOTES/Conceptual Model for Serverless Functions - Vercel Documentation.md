Cloud infrastructure providers typically give us access to several layers of abstraction that map to the traditional counterparts:

-   Set of Computers → Cluster
-   Computer → VM Instance (e.g., [EC2](https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc))
-   Process → Container
-   Thread → Function

Vercel focuses on the last one: the Serverless Function. If we think in terms of primitives, it closely mirrors a [thread of computation](https://en.wikipedia.org/wiki/Thread_(computing)).

We have typically been able to provision entire computers or orchestrate processes, but a faster, more granular and more parallelizable primitive like the thread has only recently become available.

### [Versus Processes and Containers](https://vercel.com/docs/serverless-functions/conceptual-model#versus-processes-and-containers)

Serverless Functions have a lot of benefits over booting up and managing containers or processes, let alone computers or clusters.

One of the main benefits is that the developer only needs to reason about one concurrent computation happening in the context of their code, despite many of them being able to run in parallel.

For example, a Serverless Function handles an incoming request, runs some computation, and responds. If another request comes to the same path, the system will automatically spawn a new isolated function, thus scaling automatically.

In contrast, processes and containers tend to expose an entire server as their entrypoint. That server would then define code for handling many types of requests.

The code you specify for handling those requests would share one common context and state. Scaling becomes harder because it is difficult to decide how many concurrent requests the process can handle.

Furthermore, if a systemic error occurs when handling an incoming request or event, the entire process or container would be affected, and with it many other requests being handled inside it.

### [Per-Entrypoint Granularity](https://vercel.com/docs/serverless-functions/conceptual-model#per-entrypoint-granularity)

Vercel makes it easy to build one Serverless Function per potential entrypoint of your application. If you are familiar with frontend development, think of this as code-splitting for the backend. This has numerous benefits:

-   Ensures smaller package sizes, making cold bootup times very fast
-   Makes builds faster by analyzing and only re-building changes
-   Improves security by increasing isolation

### [Lifecycle and Scalability](https://vercel.com/docs/serverless-functions/conceptual-model#lifecycle-and-scalability)

In order to scale, more copies of your software spawn and balance the incoming load of traffic between them. This is known as [horizontal scalability](https://en.wikipedia.org/wiki/Scalability#Horizontal_and_vertical_scaling).

With traditional process-based architectures, scaling like this is possible but has significant drawbacks and challenges:

-   Auto-scaling algorithms are based on high-level metrics like CPU or Memory usage. They might scale too eagerly or not quickly enough, therefore not serving some portion of the traffic in an acceptable amount of time
-   The developer loses the ability to understand and predict exactly how their software will scale since the metrics as mentioned above are very dynamic
-   The developer might have to spend a lot of time and resources carefully running simulations, setting up metric dashboards, ensuring the algorithms are fine-tuned

Typically, when you spawn a server, worker, container, or process, the requests end up all combined into one process, spawned across several cores and computers

![](https://vercel.com/docs-proxy/static/docs/serverless-functions/old-request-process.png)

A typical request model.

With Vercel, the mental model is much simpler. For each incoming request, a new invocation happens.

![](https://vercel.com/docs-proxy/static/docs/serverless-functions/new-lambda-process.png)

The request model of Serverless Functions on Vercel.

If a request happens quickly thereafter, the function is re-used for a subsequent invocation. After a while, only enough functions will stay around to meet the needs of incoming traffic.

If no more traffic comes, Serverless Functions (unlike nearly all alternative systems) will _scale to zero_. This means that you only _pay_ precisely for the level of scale that your traffic demands.

### [Cold and Hot Boots](https://vercel.com/docs/serverless-functions/conceptual-model#cold-and-hot-boots)

When a Serverless Function boots up from scratch, that is known as a _cold boot_. When it is re-used, we can say the function was _warm_.

Re-using a function means the underlying container that hosts it does not get discarded. State, such as temporary files, memory caches, sub-processes, is preserved. This empowers the developer not just to minimize the time spent in the _booting_ process, but to also take advantage of caching data (in memory or filesystem) and [memoizing](https://en.wikipedia.org/wiki/Memoization) expensive computations.

It is important to note that Serverless Functions, even while the underlying container is hot, cannot leave tasks running. If a sub-process is running by the time the response is returned, the entire container is _frozen_. When a new invocation happens, if the container is re-used, it is unfrozen, which allows sub-processes to continue running.

To minimize the latency difference between a cold and boot instantiation, Vercel aids by:

-   Allowing per-entrypoint granularity. This means that when a user hits a particular endpoint, only the code associated to handle that request has to be fetched and booted
-   Imposing a limit on [function size](https://vercel.com/docs/platform/limits#serverless-function-size). Cloud providers allow for a variety of different sized functions, but we have picked one that is aligned with making cold boot instantiation nearly instant for user-facing workloads (such as serving HTTP traffic)
-   When using Next.js, Vercel optimizes Serverless Function output for server-rendered pages and API Routes. All functions will be created inside the same bundle (or in multiple chunks if greater than 50mb). This helps reduce cold starts since the bundled function is more likely warm