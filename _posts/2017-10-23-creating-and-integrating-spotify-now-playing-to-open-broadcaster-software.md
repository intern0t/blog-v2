---
layout: post
title: "Creating and integrating Spotify's Now playing track to Open Broadcaster Software (OBS) using C#."
author: Prashant Shrestha 
date: 2017-10-23 18:09:27 -400 
categories: development
tags: c# csharp develop .net visualstudio spotify music capture file obs recorder stream
poster: https://i.imgur.com/Ipq5fKi.png
---

Most of us, an avid music listeners out there are familiar with [Spotify](http://www.spotify.com/), a subscription based music streaming service with large collection of music. I listen to relaxing and focus music while developing or playing games. A distant friend, a game streamer insisted that I help him out with setting [Open Broadcaster Software (OBS)](https://obsproject.com/) to dispaly the music that he plays in his stream. After couple exchange of words, he said that some of his viewers gave him this idea, maybe they liked the music but had difficulty finding the title.

I **agreed** to help him and gave it a bit of thought about how I should approach this. Considering this tool is developed in .NET Framework 4.0 using C# and targets Windows operating system as primary operating system, the title of the Spotify window makes this job a lot easier, although we can only see `Spotify Premium` or `Spotify`.

<!--excerpt-->

I later realized that almost every media players I've used until today have updated title bar on media's play event however for Spotify, it isn't visible.

[![](https://i.imgur.com/EM1JxRI.png)](https://i.imgur.com/EM1JxRI.png){: data-rel="lightcase"}

After no luck with retrieving the track from the Spotify's title bar, I decided to deep a little deeper by checking my Task Manager, even then, multiple instances.

[![](https://i.imgur.com/rZ0ePMh.png)](https://i.imgur.com/rZ0ePMh.png){: data-rel="lightcase"}

Considering those Spotify instances have varying `Process ID`, not all of them possesses the current playing track information.

#### Finding the right approach.

The biggest hurdle with finding the right approach yet keeping the process simple takes quite a long time as I had to enlist various options and test it all out. I tried using [Win32 hooks](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644960(v=vs.85).aspx), [unmanaged APIs](https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/) and [interops](http://www.pinvoke.net/) but the easiest one yet built-in was `Process` [class](https://msdn.microsoft.com/en-us/library/system.diagnostics.process(v=vs.110).aspx) in C#.

`Process` class' various built-in functions and properties can easily help me capture the Window's title. The ones I used are `GetProcessesByName()`, `MainWindowTitle`, and `GetProcessById()`.

#### Finding the right Spotify process.

Spotify had multiple instances; I am sure they are helping the main instance with certain task. However, I needed to differentiate between each one and grab the right one. In order to do so, I made use of `GetProcessesByName()` function under `Process` class. The reason is that, for all the instances of Spotify, the process ID is re-assigned after opening Spotify client, it never stays the same or constant. If we fire up our [Task Manager](https://i.imgur.com/rZ0ePMh.png){: data-rel="lightcase"} and observe all the process IDs for those instances, it is pretty obvious that they aren't the same.

{% highlight c# %}
Process[] spotifyProcesses = Process.GetProcessesByName("spotify");
{% endhighlight %}

After initializing a collection of all Spotify processes, I looped through the `MainWindowTitle` property of each process and voila! Some returned a whitespace `string` and finally the title of a track currently being played. I created a function to do this, kept it clean and organized, in case if I have to make changes in the future. Also, I initialized a new variable to store our process ID for later use and avoid the mess of finding the right process again and again!

{% highlight c# %}
private static int spotifyProcessID = 0;

public void GetSpotifyProcesses()
{
    Process[] spotifyProcesses = Process.GetProcessesByName("spotify");
    foreach (Process P in spotifyProcesses)
    {
        if (!string.IsNullOrEmpty(P.MainWindowTitle))
        {
            spotifyProcessID = P.Id;
            break;
        }
        else
        {
            spotifyProcessID = 0;
        }
    }
}
{% endhighlight %}

Now that I know that the variable `spotifyProcessID` holds either `0`, a failure to find the right process or the right process whose title did not have a whitespace, in simple words, a valid non-empty string. In addition, I called the `GetSpotifyProcesses()` function in my Window Form's `Load` event.

#### Obtaining the Track title.

This is the easiest process of all as I already have the title from `Process.MainWindowTitle` property but a little different as we are trying to avoid the loop through of finding the right Spotify process, the very reason I initialized and assigned `spotifyProcessID` which can now be directly accessed using our yet another built-in `Process` class' method, `GetProcessById()`. Keeping it organized, I created yet another function to get just the track title.

{% highlight c# %}
private static String spotifyNowPlayingTrack = string.Empty;

public string GetSpotifyTrack(int _procID)
{
    string spotifyTrack = Process.GetProcessById(_procID).MainWindowTitle;
    spotifyNowPlayingTrack = spotifyTrack;
    return spotifyTrack.ToLower().Contains("spotify") ? 
        "Currently not playing any songs!" : 
        "Spotify (Now Playing) : " + spotifyTrack;
}
{% endhighlight %}

#### Creating and Updating our source file.

This is easily achieved using `WriteAllText()` method in a built-in `File` class. I created a separate function to create or update our file, considering the tool I am developing, this function shall be invoked in the certain interval if certain set conditions are met.

{% highlight c# %}
public void UpdateSong()
{
    try
    {
        // Check if current playing is the same as old one we have.
        string currentlyPlaying = GetSpotifyTrack(spotifyProcessID);
        if (!currentlyPlaying.Equals(spotifyNowPlayingTrack))
        {
            // Check if our file exists, this can be anything to be honest.
            if (File.Exists("SpotifyNowPlaying"))
            {
                // If it already exists, write the track's title!
                File.WriteAllText("SpotifyNowPlaying", currentlyPlaying);
            }
            else
            {
                // Doesn't exist, create it.
                File.Create("SpotifyNowPlaying");
                // Recall the UpdateSong function.
                UpdateSong();
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.Message);
    }
}
{% endhighlight %}

#### Adding Interval for `UpdateSong()` method.

I kept this process simple by using our Window Form's component called `Timer`, all I had to worry about is what function to call and in what interval to call. Initialized a new `Timer` variable and a separate one for an interval.

{% highlight c# %}
private static System.Windows.Forms.Timer T = new System.Windows.Forms.Timer();
private static int captureInterval = 2;
{% endhighlight %}

Implementing the Timer's event using `T.Tick += T_Tick;` under `InitializeComponent();`. In this `Tick` event, we will fetch and update our file where the conditions to whether update the file is already set in our `UpdateSong()` function.

{% highlight c# %}
private void T_Tick(object sender, EventArgs e)
{
    new Thread(new ThreadStart(UpdateSong)).Start();
}
{% endhighlight %}

We can set the interval of our `Tick` event using `Interval` property of `Timer`. `Interval` property takes value in milliseconds, therefore, the `* 1000`.

{% highlight c# %}
// Every 2 seconds, UpdateSong method is invoked in a new thread.
T.Interval = captureInterval * 1000;
T.Enabled = true;
{% endhighlight %}

#### Adding Text Source to OBS.

I am not trying to just get the track's title but to display it on OBS, make it seem/act like as if one of the OBS's source is hooked to Spotify itself. For this very purpose, I fiddled around a bit with OBS myself; it's all fun and games. OBS allows adding Text (GDI+/FreeType 2) as a source, exactly what I needed and what I used as it seemed to be a lot more convenient for my purpose.

[![](https://i.imgur.com/rVotUBY.png)](https://i.imgur.com/rVotUBY.png){: data-rel="lightcase"}

Give our source a proper title so we can differentiate between our Sources.

[![](https://i.imgur.com/I7RKKVH.png)](https://i.imgur.com/I7RKKVH.png){: data-rel="lightcase"}

Editing our recently added Text (GDI+) source, two things to look for. `Read from file` option and `Use Custom Text Extents`. You can modify or setup the `Use Custom Text Extents`, according to your needs and setup.

[![](https://i.imgur.com/JduT60c.png)](https://i.imgur.com/JduT60c.png){: data-rel="lightcase"}

At this point, we find the path to our `SpotifyNowPlaying` file created and updated by `UpdateSong()` function which will by default created in the executable's path.

#### Modifications and Updates.

This is it, an easy yet clean way to add Spotify's currently playing track title to OBS. I decided to add some buttons to start and stop capturing the title, change intervals, etc. I have the updated code in my [Bitbucket](https://bitbucket.org/intern0t/spotify-to-obs) if you ever feel like modifying or updating or even just fiddle around with it.

Those are some of the screenies I took after various feature addition and modifications, nothing advanced. The one on the left with bland logo means the Spotify process was not found whereas the right means Spotify process was found.

[![](https://i.imgur.com/VcD7WGU.png)](https://i.imgur.com/VcD7WGU.png){: data-rel="lightcase"}
[![](https://i.imgur.com/GyAyQDO.png)](https://i.imgur.com/GyAyQDO.png){: data-rel="lightcase"}

Here's a [demo](https://i.imgur.com/EWK7fxU.gif){: data-rel="lightcase"} of the tool in action.

[![](https://i.imgur.com/EWK7fxU.gif)](https://i.imgur.com/EWK7fxU.gif){: data-rel="lightcase"}

Good luck & Stay creative!