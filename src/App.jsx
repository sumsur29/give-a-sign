import { useState, useEffect, useCallback, useRef } from "react";
import { Analytics } from '@vercel/analytics/react';

// ══════════════════════════════════════════════════════════════
// 500 SIGNS: [text, source, type, verdict]
// ══════════════════════════════════════════════════════════════
const S=[
["I still think I am the greatest.","Kanye West","celebrity","yes"],
["Nothing in life is promised except death.","Kanye West","celebrity","no"],
["Believe in your flyness. Conquer your shyness.","Kanye West","celebrity","yes"],
["I refuse to accept other people's ideas of happiness for me.","Kanye West","celebrity","yes"],
["The risk for me would be in not taking one.","Kanye West","celebrity","yes"],
["I love sleep; it's my favorite.","Kanye West","celebrity","no"],
["Our work is never over.","Kanye West","celebrity","yes"],
["Criticism can bother you, but you should be more bothered if there's no criticism. That means you're too safe.","Kanye West","celebrity","yes"],
["I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle.","Kanye West","celebrity","no"],
["It's not 'can'; it's 'will.' You have to will things into fruition.","Kanye West","celebrity","yes"],
["Everyone's always telling you to be humble. When was the last time someone told you to be great?","Kanye West","celebrity","yes"],
["Started from the bottom, now we're here.","Drake","song","yes"],
["Know yourself, know your worth.","Drake","song","yes"],
["Jealousy is just love and hate at the same time.","Drake","song","no"],
["Sometimes it's the journey that teaches you a lot about your destination.","Drake","celebrity","no"],
["I was born to make mistakes, not to fake perfection.","Drake","song","yes"],
["Everybody dies but not everybody lives.","Drake","song","yes"],
["Sweatpants, hair tied, chillin' with no makeup on.","Drake","song","no"],
["I'm way too good to you.","Drake","song","no"],
["We live in a generation of not being in love and not being together.","Drake","celebrity","no"],
["Kill them with success and bury them with a smile.","Drake","celebrity","yes"],
["Look, if you had one shot, one opportunity, to seize everything you ever wanted — would you capture it, or just let it slip?","Eminem — Lose Yourself","song","yes"],
["I don't care if you're black, white, straight, gay. I'm here for the music.","Eminem","celebrity","yes"],
["The truth is you don't know what is going to happen tomorrow.","Eminem","celebrity","no"],
["Everybody has goals, aspirations, or whatever. Not everybody gets the chance to do it.","Eminem","celebrity","yes"],
["You can make something of your life. It just depends on your drive.","Eminem","celebrity","yes"],
["Snap back to reality, oh there goes gravity.","Eminem — Lose Yourself","song","no"],
["Mo money, mo problems.","Biggie Smalls","song","no"],
["It was all a dream.","Biggie Smalls — Juicy","song","yes"],
["Sky's the limit.","Biggie Smalls","song","yes"],
["I got 99 problems but this ain't one.","Jay-Z","song","yes"],
["Allow me to re-introduce myself.","Jay-Z","song","yes"],
["I'm not a businessman, I'm a business, man.","Jay-Z","celebrity","yes"],
["Difficult takes a day, impossible takes a week.","Jay-Z","celebrity","yes"],
["Sit down. Be humble.","Kendrick Lamar","song","no"],
["We gon' be alright.","Kendrick Lamar","song","yes"],
["If I quit this game right now, I'd be the greatest.","Kendrick Lamar","celebrity","yes"],
["Reality is wrong. Dreams are for real.","2Pac","celebrity","yes"],
["You can spend minutes, hours, days, or months over-analyzing a situation — or you can just leave.","2Pac","celebrity","no"],
["During your life, never stop dreaming.","2Pac","celebrity","yes"],
["The world is yours.","Nas — The World Is Yours","song","yes"],
["Life's a b**** and then you die.","Nas","song","no"],
["Sleep is the cousin of death.","Nas","song","no"],
["One day it'll all make sense.","Common","song","yes"],
["N.E.R.D. — No one ever really dies.","Pharrell","celebrity","yes"],
["Shut up and drive.","Rihanna","song","yes"],
["Please don't stop the music.","Rihanna","song","yes"],
["We found love in a hopeless place.","Rihanna","song","yes"],
["Talk to me nice.","Rihanna — press conference","celebrity","no"],
["Shine bright like a diamond.","Rihanna","song","yes"],
["Work work work work work.","Rihanna","song","yes"],
["Live your life.","Rihanna ft. T.I.","song","yes"],
["Don't tell me you're sorry 'cause you're not.","Rihanna — Take a Bow","song","no"],
["Haters gonna hate hate hate. Shake it off.","Taylor Swift","song","yes"],
["Look what you made me do.","Taylor Swift","song","no"],
["We are never ever getting back together.","Taylor Swift","song","no"],
["Long story short, I survived.","Taylor Swift","song","yes"],
["It's me, hi, I'm the problem, it's me.","Taylor Swift — Anti-Hero","song","no"],
["Band-aids don't fix bullet holes.","Taylor Swift — Bad Blood","song","no"],
["Who run the world? Girls.","Beyoncé","song","yes"],
["To the left, to the left.","Beyoncé — Irreplaceable","song","no"],
["I'm a survivor, I'm not gon' give up.","Destiny's Child","song","yes"],
["I woke up like this. Flawless.","Beyoncé","song","yes"],
["If everything was perfect, you would never learn and you would never grow.","Beyoncé","celebrity","yes"],
["Your self-worth is determined by you. You don't have to depend on someone telling you who you are.","Beyoncé","celebrity","yes"],
["Thank U, next.","Ariana Grande","song","no"],
["I see it, I like it, I want it, I got it.","Ariana Grande — 7 Rings","song","yes"],
["One taught me love, one taught me patience, one taught me pain.","Ariana Grande","song","no"],
["I don't need anything else. Except shoes.","Ariana Grande","celebrity","yes"],
["Be happy with being you. Love your flaws. Own your quirks.","Ariana Grande","celebrity","yes"],
["Hello from the other side.","Adele","song","no"],
["Rolling in the deep.","Adele","song","no"],
["We could have had it all.","Adele","song","no"],
["There's a fire starting in my heart.","Adele","song","yes"],
["I came in like a wrecking ball.","Miley Cyrus","song","no"],
["It's the climb.","Miley Cyrus","song","yes"],
["Don't stop believin'. Hold on to that feelin'.","Journey","song","yes"],
["Let it be.","The Beatles","song","no"],
["Here comes the sun.","The Beatles","song","yes"],
["All you need is love.","The Beatles","song","yes"],
["We are the champions, my friends.","Queen","song","yes"],
["Another one bites the dust.","Queen","song","no"],
["Is this the real life? Is this just fantasy?","Queen — Bohemian Rhapsody","song","no"],
["Don't stop me now, I'm having such a good time.","Queen","song","yes"],
["I want to break free.","Queen","song","yes"],
["I will survive.","Gloria Gaynor","song","yes"],
["Hello darkness, my old friend.","Simon & Garfunkel","song","no"],
["What doesn't kill you makes you stronger.","Kelly Clarkson","song","yes"],
["Hit the road Jack, and don't you come back.","Ray Charles","song","no"],
["Every little thing is gonna be alright.","Bob Marley","song","yes"],
["Don't worry, be happy.","Bobby McFerrin","song","yes"],
["I've got the eye of the tiger.","Survivor","song","yes"],
["Livin' on a prayer.","Bon Jovi","song","yes"],
["Born to run.","Bruce Springsteen","song","yes"],
["Under pressure.","Queen & David Bowie","song","no"],
["Changes.","David Bowie","song","no"],
["I can't get no satisfaction.","The Rolling Stones","song","no"],
["Imagine all the people living life in peace.","John Lennon","song","yes"],
["The show must go on.","Queen","song","yes"],
["What a wonderful world.","Louis Armstrong","song","yes"],
["Respect. R-E-S-P-E-C-T.","Aretha Franklin","song","yes"],
["I'm still standing.","Elton John","song","yes"],
["Lean on me.","Bill Withers","song","yes"],
["Ain't no mountain high enough.","Marvin Gaye","song","yes"],
["You can't hurry love.","The Supremes","song","no"],
["Stop. In the name of love.","The Supremes","song","no"],
["My way.","Frank Sinatra","song","yes"],
["Fly me to the moon.","Frank Sinatra","song","yes"],
["Good riddance. It's something unpredictable.","Green Day","song","no"],
["Wake me up when September ends.","Green Day","song","no"],
["Lose yourself to dance.","Daft Punk","song","yes"],
["Get lucky.","Daft Punk","song","yes"],
["Happy.","Pharrell Williams","song","yes"],
["This is America.","Childish Gambino","song","no"],
["Blinding lights.","The Weeknd","song","yes"],
["Save your tears for another day.","The Weeknd","song","no"],
["Starboy.","The Weeknd","song","yes"],
["Bad Guy.","Billie Eilish","song","no"],
["Everything I wanted.","Billie Eilish","song","yes"],
["Therefore I am.","Billie Eilish","song","yes"],
["I'm the one.","DJ Khaled ft. everybody","song","yes"],
["All I do is win.","DJ Khaled","song","yes"],
["Another one.","DJ Khaled","celebrity","yes"],
["God's Plan.","Drake","song","yes"],
["Nice for what.","Drake","song","yes"],
["Hotline Bling.","Drake","song","no"],
["Old Town Road.","Lil Nas X","song","yes"],
["Call me by your name.","Lil Nas X","song","no"],
["Congratulations.","Post Malone","song","yes"],
["Rockstar.","Post Malone","song","yes"],
["Circles.","Post Malone","song","no"],
["Sunflower.","Post Malone","song","yes"],
["Levitating.","Dua Lipa","song","yes"],
["Don't start now.","Dua Lipa","song","yes"],
["Watermelon Sugar.","Harry Styles","song","yes"],
["As it was.","Harry Styles","song","no"],
["Sign of the Times.","Harry Styles","song","no"],
["Treat people with kindness.","Harry Styles","celebrity","yes"],
["Flowers. I can buy myself flowers.","Miley Cyrus — Flowers","song","yes"],
["When something is important enough, you do it even if the odds are not in your favor.","Elon Musk","celebrity","yes"],
["Your time is limited. Don't waste it living someone else's life.","Steve Jobs — Stanford, 2005","celebrity","yes"],
["Stay hungry, stay foolish.","Steve Jobs — Stanford, 2005","celebrity","yes"],
["Interesting.","Elon Musk — to MrBeast at the Super Bowl","celebrity","no"],
["I just want to have fun and make people happy.","MrBeast","celebrity","yes"],
["If you're offered a seat on a rocket ship, don't ask which seat. Just get on.","Sheryl Sandberg","celebrity","yes"],
["The best revenge is massive success.","Frank Sinatra","celebrity","yes"],
["Success is a lousy teacher. It seduces smart people into thinking they can't lose.","Bill Gates","celebrity","no"],
["And I took that personally.","Michael Jordan — The Last Dance","celebrity","yes"],
["You miss 100% of the shots you don't take.","Wayne Gretzky — Michael Scott","celebrity","yes"],
["It's a no from me, dawg.","Simon Cowell — American Idol","celebrity","no"],
["In the middle of every difficulty lies opportunity.","Albert Einstein","celebrity","yes"],
["I have not failed. I've just found 10,000 ways that won't work.","Thomas Edison","celebrity","yes"],
["Whether you think you can, or you think you can't — you're right.","Henry Ford","celebrity","yes"],
["The only thing we have to fear is fear itself.","FDR","celebrity","yes"],
["Be the change you wish to see in the world.","Gandhi","celebrity","yes"],
["Do what you can, with what you have, where you are.","Theodore Roosevelt","celebrity","yes"],
["It always seems impossible until it's done.","Nelson Mandela","celebrity","yes"],
["If you want to go fast, go alone. If you want to go far, go together.","African Proverb","celebrity","yes"],
["Fortune favors the bold.","Latin Proverb","celebrity","yes"],
["Well-behaved women seldom make history.","Laurel Thatcher Ulrich","celebrity","yes"],
["I think, therefore I am.","Descartes","celebrity","no"],
["Not all those who wander are lost.","J.R.R. Tolkien","celebrity","yes"],
["The unexamined life is not worth living.","Socrates","celebrity","no"],
["Life is what happens when you're busy making other plans.","John Lennon","celebrity","no"],
["You must be the change you wish to see in the world.","Gandhi","celebrity","yes"],
["Two roads diverged in a wood, and I took the one less traveled by.","Robert Frost","celebrity","yes"],
["If you're going through hell, keep going.","Winston Churchill","celebrity","yes"],
["The only way to do great work is to love what you do.","Steve Jobs","celebrity","yes"],
["Move fast and break things.","Mark Zuckerberg","celebrity","yes"],
["Done is better than perfect.","Sheryl Sandberg","celebrity","yes"],
["Make every detail perfect and limit the number of details to perfect.","Jack Dorsey","celebrity","no"],
["The best time to plant a tree was 20 years ago. The second best time is now.","Chinese Proverb","celebrity","yes"],
["Life shrinks or expands in proportion to one's courage.","Anaïs Nin","celebrity","yes"],
["I have nothing to offer but blood, toil, tears and sweat.","Winston Churchill","celebrity","yes"],
["Fall seven times, stand up eight.","Japanese Proverb","celebrity","yes"],
["What we think, we become.","Buddha","celebrity","yes"],
["Pressure is a privilege.","Billie Jean King","celebrity","yes"],
["I hated every minute of training, but I said: don't quit. Suffer now and live the rest of your life as a champion.","Muhammad Ali","celebrity","yes"],
["Float like a butterfly, sting like a bee.","Muhammad Ali","celebrity","yes"],
["I've failed over and over and over again in my life. And that is why I succeed.","Michael Jordan","celebrity","yes"],
["Don't put a limit on anything. The more you dream, the further you get.","Michael Phelps","celebrity","yes"],
["I am lucky that whatever fear I have inside me, my desire to win is always stronger.","Serena Williams","celebrity","yes"],
["Just believe in yourself. Even if you don't, pretend that you do and at some point, you will.","Venus Williams","celebrity","yes"],
["It's not whether you get knocked down, it's whether you get up.","Vince Lombardi","celebrity","yes"],
["Losing is a learning experience. It teaches you humility.","Yogi Berra","celebrity","no"],
["You are never really playing an opponent. You are playing yourself.","Arthur Ashe","celebrity","no"],
["Hard work beats talent when talent doesn't work hard.","Tim Notke","celebrity","yes"],
["The more difficult the victory, the greater the happiness in winning.","Pelé","celebrity","yes"],
["I learned all about life with a ball at my feet.","Ronaldinho","celebrity","yes"],
["I don't have time to be tired.","Cristiano Ronaldo","celebrity","yes"],
["The day you think there is no improvements to be made is a sad one for any player.","Lionel Messi","celebrity","no"],
["Age is no barrier. It's a limitation you put on your mind.","Jackie Joyner-Kersee","celebrity","yes"],
["Champions keep playing until they get it right.","Billie Jean King","celebrity","yes"],
["The best motivation always comes from within.","Michael Johnson","celebrity","yes"],
["To go out there and prove what I can do has taught me a lot about who I am.","Simone Biles","celebrity","yes"],
["Pain is temporary. Quitting lasts forever.","Lance Armstrong","celebrity","yes"],
["Each day I work on getting better.","Katie Ledecky","celebrity","yes"],
["When you fall, get right back up. Just keep going.","Lindsey Vonn","celebrity","yes"],
["I don't count my sit-ups. I only start counting when it starts hurting.","Muhammad Ali","celebrity","yes"],
["The man who has no imagination has no wings.","Muhammad Ali","celebrity","yes"],
["I'm not the next Usain Bolt or Michael Phelps. I'm the first Simone Biles.","Simone Biles","celebrity","yes"],
["Some people want it to happen, some wish it would happen, others make it happen.","Michael Jordan","celebrity","yes"],
["Talent wins games, but teamwork wins championships.","Michael Jordan","celebrity","yes"],
["Persist without exception.","Kobe Bryant — Mamba Mentality","celebrity","yes"],
["Just Do It.","Nike","billboard","yes"],
["Impossible Is Nothing.","Adidas","billboard","yes"],
["Think Different.","Apple","billboard","yes"],
["I'm Lovin' It.","McDonald's","billboard","yes"],
["Because You're Worth It.","L'Oréal","billboard","yes"],
["Keeps Going and Going and Going.","Energizer","billboard","yes"],
["The Happiest Place on Earth.","Disneyland","billboard","yes"],
["Quality Never Goes Out of Style.","Levi's","billboard","yes"],
["See What's Next.","Netflix","billboard","yes"],
["Open Happiness.","Coca-Cola","billboard","yes"],
["Think Outside the Bun.","Taco Bell","billboard","yes"],
["A Diamond Is Forever.","De Beers","billboard","yes"],
["Live Más.","Taco Bell","billboard","yes"],
["We Try Harder.","Avis","billboard","yes"],
["Should've Gone to Specsavers.","Specsavers","billboard","no"],
["Everywhere You Want to Be.","Visa","billboard","yes"],
["Netflix Is a Joke.","Netflix — LA","billboard","no"],
["Finger Lickin' Good.","KFC","billboard","yes"],
["It Has to Be.","Heinz","billboard","yes"],
["Have a break. Have a Kit Kat.","Kit Kat","billboard","no"],
["Melts in your mouth, not in your hands.","M&M's","billboard","yes"],
["The best a man can get.","Gillette","billboard","yes"],
["Red Bull gives you wings.","Red Bull","billboard","yes"],
["What's the worst that could happen?","Dr Pepper","billboard","yes"],
["Maybe she's born with it.","Maybelline","billboard","yes"],
["Good things come to those who wait.","Guinness","billboard","no"],
["Every kiss begins with Kay.","Kay Jewelers","billboard","yes"],
["Where's the beef?","Wendy's","billboard","no"],
["Taste the rainbow.","Skittles","billboard","yes"],
["The ultimate driving machine.","BMW","billboard","yes"],
["Do, or do not. There is no try.","Yoda — Star Wars","movie","yes"],
["Life finds a way.","Jurassic Park","movie","yes"],
["Why so serious?","The Joker — The Dark Knight","movie","no"],
["Frankly my dear, I don't give a damn.","Gone with the Wind","movie","no"],
["Roads? Where we're going, we don't need roads.","Back to the Future","movie","yes"],
["I'm going to make him an offer he can't refuse.","The Godfather","movie","yes"],
["Houston, we have a problem.","Apollo 13","movie","no"],
["You had me at hello.","Jerry Maguire","movie","yes"],
["To infinity and beyond!","Toy Story","movie","yes"],
["I'll be back.","The Terminator","movie","no"],
["May the Force be with you.","Star Wars","movie","yes"],
["Not today.","Arya Stark — GOT","movie","no"],
["I see this as an absolute win.","Hulk — Endgame","movie","yes"],
["Reality is often disappointing.","Thanos","movie","no"],
["Fine. I'll do it myself.","Thanos","movie","yes"],
["How you doin'?","Joey — Friends","movie","yes"],
["That's what she said.","Michael Scott — The Office","movie","yes"],
["Cool cool cool cool cool. No doubt.","Jake Peralta — Brooklyn 99","movie","yes"],
["After all, tomorrow is another day.","Gone with the Wind","movie","yes"],
["Here's looking at you, kid.","Casablanca","movie","yes"],
["You can't handle the truth!","A Few Good Men","movie","no"],
["Run, Forrest, run!","Forrest Gump","movie","yes"],
["Life is like a box of chocolates. You never know what you're gonna get.","Forrest Gump","movie","no"],
["I'm the king of the world!","Titanic","movie","yes"],
["Keep your friends close, but your enemies closer.","The Godfather Part II","movie","no"],
["Carpe diem. Seize the day.","Dead Poets Society","movie","yes"],
["Just keep swimming.","Dory — Finding Nemo","movie","yes"],
["Oh yes, the past can hurt. But you can either run from it, or learn from it.","The Lion King","movie","yes"],
["Hakuna Matata. It means no worries.","The Lion King","movie","yes"],
["To be or not to be, that is the question.","Hamlet","movie","no"],
["You're going to need a bigger boat.","Jaws","movie","no"],
["I feel the need — the need for speed.","Top Gun","movie","yes"],
["There's no place like home.","The Wizard of Oz","movie","no"],
["I'm walking here!","Midnight Cowboy","movie","yes"],
["Wax on, wax off.","The Karate Kid","movie","yes"],
["With great power comes great responsibility.","Spider-Man","movie","no"],
["I am Iron Man.","Iron Man","movie","yes"],
["I can do this all day.","Captain America","movie","yes"],
["Wakanda forever.","Black Panther","movie","yes"],
["I am Groot.","Guardians of the Galaxy","movie","yes"],
["I am inevitable.","Thanos — Endgame","movie","no"],
["That'll do, pig. That'll do.","Babe","movie","no"],
["Nobody puts Baby in a corner.","Dirty Dancing","movie","yes"],
["You talking to me?","Taxi Driver","movie","no"],
["Say hello to my little friend.","Scarface","movie","yes"],
["Ogres are like onions. We have layers.","Shrek","movie","no"],
["I am your father.","Darth Vader — Star Wars","movie","no"],
["Hasta la vista, baby.","The Terminator","movie","no"],
["Winter is coming.","Ned Stark — GOT","movie","no"],
["What is dead may never die.","Game of Thrones","movie","yes"],
["This is fine.","The 'This is Fine' dog","meme","no"],
["Understandable, have a great day.","Internet","meme","no"],
["It is what it is.","Everyone, everywhere","meme","no"],
["No ragrets.","We're the Millers","meme","yes"],
["Ight, imma head out.","SpongeBob","meme","no"],
["Say less.","Gen Z","meme","yes"],
["Send it.","Every extreme sports video","meme","yes"],
["YOLO.","Drake / The entire 2010s","meme","yes"],
["Let him cook.","Twitter / X, 2023","meme","yes"],
["Main character energy.","TikTok","meme","yes"],
["Trust the process.","Yoga studio sign","meme","yes"],
["It's a no from me, dawg.","Simon Cowell","meme","no"],
["OK Boomer.","The internet, 2019","meme","no"],
["Slay.","Gen Z","meme","yes"],
["Rent free in my head.","Internet","meme","no"],
["Tell me you're X without telling me you're X.","TikTok","meme","no"],
["No cap.","Gen Z","meme","yes"],
["Caught in 4K.","Internet","meme","no"],
["We move.","Twitter / X","meme","yes"],
["Nah, I'd win.","Gojo Satoru — Jujutsu Kaisen","meme","yes"],
["That's suspicious, that's weird.","TikTok sound","meme","no"],
["I understood the assignment.","Internet","meme","yes"],
["Skill issue.","Gamers everywhere","meme","no"],
["Touch grass.","Internet","meme","no"],
["It hits different.","Gen Z","meme","yes"],
["Living rent free.","Internet","meme","no"],
["Respectfully, no.","Corporate internet","meme","no"],
["Bet.","Gen Z","meme","yes"],
["Periodt.","Internet","meme","yes"],
["And that's on that.","Internet","meme","yes"],
["The way to get started is to quit talking and begin doing.","Walt Disney","celebrity","yes"],
["Innovation distinguishes between a leader and a follower.","Steve Jobs","celebrity","yes"],
["If you double the number of experiments you do, you double your inventiveness.","Jeff Bezos","celebrity","yes"],
["Your most unhappy customers are your greatest source of learning.","Bill Gates","celebrity","no"],
["If you're not embarrassed by the first version of your product, you've launched too late.","Reid Hoffman","celebrity","yes"],
["Ideas are easy. Implementation is hard.","Guy Kawasaki","celebrity","yes"],
["It's fine to celebrate success, but it is more important to heed the lessons of failure.","Bill Gates","celebrity","no"],
["Stay close to anything that makes you glad you are alive.","Hafiz","celebrity","yes"],
["The people who are crazy enough to think they can change the world are the ones who do.","Apple ad — Think Different","billboard","yes"],
["Don't find customers for your products, find products for your customers.","Seth Godin","celebrity","yes"],
["Fail fast, learn faster.","Silicon Valley Mantra","celebrity","yes"],
["What would you do if you weren't afraid?","Sheryl Sandberg — Lean In","celebrity","yes"],
["Make something people want.","Y Combinator","billboard","yes"],
["Default alive or default dead?","Paul Graham","celebrity","no"],
["Real artists ship.","Steve Jobs","celebrity","yes"],
["If you want something new, you have to stop doing something old.","Peter Drucker","celebrity","yes"],
["Culture eats strategy for breakfast.","Peter Drucker","celebrity","no"],
["Take risks. If you win, you'll be happy. If you lose, you'll be wise.","Unknown","celebrity","yes"],
["Life is too short to be building something nobody wants.","Ash Maurya","celebrity","no"],
["First they ignore you, then they laugh at you, then they fight you, then you win.","Misattributed to Gandhi","celebrity","yes"],
["Invent and simplify.","Amazon Leadership Principle","billboard","yes"],
["Have backbone; disagree and commit.","Amazon Leadership Principle","billboard","yes"],
["Bias for action.","Amazon Leadership Principle","billboard","yes"],
["Ship it.","Every PM ever","meme","yes"],
["Let's circle back.","Every meeting ever","meme","no"],
["The only thing I know is that I know nothing.","Socrates","celebrity","no"],
["He who has a why to live can bear almost any how.","Nietzsche","celebrity","yes"],
["Man is condemned to be free.","Jean-Paul Sartre","celebrity","yes"],
["I think, therefore I am.","Descartes","celebrity","yes"],
["The wound is the place where the light enters you.","Rumi","celebrity","yes"],
["Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.","Rumi","celebrity","yes"],
["This too shall pass.","Persian Proverb","celebrity","no"],
["What you seek is seeking you.","Rumi","celebrity","yes"],
["Memento mori. Remember you will die.","Stoic Philosophy","celebrity","no"],
["Amor fati. Love your fate.","Nietzsche / Stoics","celebrity","yes"],
["The obstacle is the way.","Marcus Aurelius / Ryan Holiday","celebrity","yes"],
["We suffer more often in imagination than in reality.","Seneca","celebrity","no"],
["No man ever steps in the same river twice.","Heraclitus","celebrity","no"],
["Happiness is not something ready-made. It comes from your own actions.","Dalai Lama","celebrity","yes"],
["In three words I can sum up everything I've learned about life: it goes on.","Robert Frost","celebrity","yes"],
["Everything you can imagine is real.","Pablo Picasso","celebrity","yes"],
["Simplicity is the ultimate sophistication.","Leonardo da Vinci","celebrity","yes"],
["The only true wisdom is in knowing you know nothing.","Socrates","celebrity","no"],
["To live is the rarest thing in the world. Most people exist, that is all.","Oscar Wilde","celebrity","yes"],
["Be yourself; everyone else is already taken.","Oscar Wilde","celebrity","yes"],
["You have power over your mind — not outside events. Realize this, and you will find strength.","Marcus Aurelius","celebrity","yes"],
["The best time is now.","Unknown","celebrity","yes"],
["Leap and the net will appear.","John Burroughs","celebrity","yes"],
["The cave you fear to enter holds the treasure you seek.","Joseph Campbell","celebrity","yes"],
["If not now, when?","Hillel the Elder","celebrity","yes"],
["We are what we repeatedly do. Excellence is not an act, but a habit.","Aristotle","celebrity","yes"],
["Know thyself.","Oracle at Delphi","celebrity","no"],
["Less is more.","Mies van der Rohe","celebrity","no"],
["Simplify, simplify.","Thoreau","celebrity","yes"],
["The journey of a thousand miles begins with a single step.","Lao Tzu","celebrity","yes"],
["I volunteer as tribute.","Katniss — Hunger Games","movie","yes"],
["May the odds be ever in your favor.","Hunger Games","movie","no"],
["It's leviOsa, not levioSA.","Hermione — Harry Potter","movie","no"],
["After all this time? Always.","Snape — Harry Potter","movie","yes"],
["It does not do to dwell on dreams and forget to live.","Dumbledore — Harry Potter","movie","no"],
["Happiness can be found even in the darkest of times, if one only remembers to turn on the light.","Dumbledore — Harry Potter","movie","yes"],
["I am no man.","Éowyn — LOTR","movie","yes"],
["All we have to decide is what to do with the time that is given us.","Gandalf — LOTR","movie","yes"],
["One does not simply walk into Mordor.","Boromir — LOTR","movie","no"],
["My precious.","Gollum — LOTR","movie","no"],
["A wizard is never late.","Gandalf — LOTR","movie","yes"],
["That's my secret, Captain. I'm always angry.","Hulk — Avengers","movie","yes"],
["We have a Hulk.","Tony Stark — Avengers","movie","yes"],
["I could do this all day.","Captain America","movie","yes"],
["I love you 3000.","Morgan Stark — Endgame","movie","yes"],
["No amount of money ever bought a second of time.","Tony Stark — Endgame","movie","no"],
["It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.","Rocky","movie","yes"],
["Every passing minute is another chance to turn it all around.","Vanilla Sky","movie","yes"],
["Get busy living, or get busy dying.","Shawshank Redemption","movie","yes"],
["Hope is a good thing, maybe the best of things.","Shawshank Redemption","movie","yes"],
["You either die a hero, or live long enough to see yourself become the villain.","Harvey Dent — The Dark Knight","movie","no"],
["It's not who I am underneath, but what I do that defines me.","Batman Begins","movie","yes"],
["Why do we fall? So we can learn to pick ourselves up.","Batman Begins","movie","yes"],
["Witness me!","Mad Max: Fury Road","movie","yes"],
["I drink your milkshake!","There Will Be Blood","movie","no"],
["In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.","Douglas Adams","celebrity","no"],
["Before you criticize someone, walk a mile in their shoes. Then you're a mile away and you have their shoes.","Jack Handey","celebrity","yes"],
["I'm not superstitious, but I am a little stitious.","Michael Scott — The Office","movie","yes"],
["I knew exactly what to do. But in a much more real sense, I had no idea what to do.","Michael Scott — The Office","movie","no"],
["Bears. Beets. Battlestar Galactica.","Jim Halpert — The Office","movie","yes"],
["You know nothing, Jon Snow.","Ygritte — GOT","movie","no"],
["I've made a huge mistake.","GOB — Arrested Development","movie","no"],
["Pivot! Pivot! PIVOT!","Ross — Friends","movie","no"],
["We were on a break!","Ross — Friends","movie","no"],
["How you doin'?","Joey — Friends","movie","yes"],
["Could this BE any more awkward?","Chandler — Friends","movie","no"],
["Legend-wait for it-dary. Legendary!","Barney — HIMYM","movie","yes"],
["Title of your sex tape.","Jake Peralta — Brooklyn 99","movie","no"],
["Noice.","Jake Peralta — Brooklyn 99","movie","yes"],
["I am the one who knocks.","Walter White — Breaking Bad","movie","yes"],
["Say my name.","Walter White — Breaking Bad","movie","yes"],
["Science, b****!","Jesse Pinkman — Breaking Bad","movie","yes"],
["I am the danger.","Walter White — Breaking Bad","movie","yes"],
["Surprise, motherf***er.","Doakes — Dexter","movie","no"],
["That's what I do. I drink and I know things.","Tyrion — GOT","movie","yes"],
["Somebody that I used to know.","Gotye","song","no"],
["Bye bye bye.","NSYNC","song","no"],
["It's gonna be me.","NSYNC","song","yes"],
["Oops, I did it again.","Britney Spears","song","no"],
["Toxic.","Britney Spears","song","no"],
["Stronger than yesterday.","Britney Spears","song","yes"],
["No scrubs.","TLC","song","no"],
["Creep.","TLC","song","no"],
["Wannabe.","Spice Girls","song","yes"],
["Say you'll be there.","Spice Girls","song","yes"],
["Nothing's gonna stop us now.","Starship","song","yes"],
["Total eclipse of the heart.","Bonnie Tyler","song","no"],
["Take on me.","a-ha","song","yes"],
["Sweet dreams are made of this.","Eurythmics","song","no"],
["Everybody wants to rule the world.","Tears for Fears","song","no"],
["Don't you forget about me.","Simple Minds","song","no"],
["Girls just want to have fun.","Cyndi Lauper","song","yes"],
["You give love a bad name.","Bon Jovi","song","no"],
["Pour some sugar on me.","Def Leppard","song","yes"],
["Welcome to the jungle.","Guns N' Roses","song","no"],
["Sweet child o' mine.","Guns N' Roses","song","yes"],
["Smells like teen spirit.","Nirvana","song","no"],
["Come as you are.","Nirvana","song","yes"],
["Creep. I'm a weirdo.","Radiohead","song","no"],
["Everything in its right place.","Radiohead","song","no"],
["Bitch better have my money.","Rihanna","song","yes"],
["Can't hold us.","Macklemore","song","yes"],
["Thrift shop.","Macklemore","song","no"],
["Uptown Funk.","Bruno Mars","song","yes"],
["Don't believe me, just watch.","Bruno Mars","song","yes"],
["Not everything that is faced can be changed. But nothing can be changed until it is faced.","James Baldwin","celebrity","no"],
["I am not what happened to me. I am what I choose to become.","Carl Jung","celebrity","yes"],
["Doubt kills more dreams than failure ever will.","Suzy Kassem","celebrity","yes"],
["You don't have to see the whole staircase. Just take the first step.","MLK Jr.","celebrity","yes"],
["Normal is nothing more than a cycle on a washing machine.","Whoopi Goldberg","celebrity","yes"],
["Worrying is like paying a debt you don't owe.","Mark Twain","celebrity","no"],
["Go confidently in the direction of your dreams.","Thoreau","celebrity","yes"],
["If opportunity doesn't knock, build a door.","Milton Berle","celebrity","yes"],
["Everything has beauty, but not everyone sees it.","Confucius","celebrity","no"],
["The greatest glory in living lies not in never falling, but in rising every time we fall.","Nelson Mandela","celebrity","yes"],
["Turn your wounds into wisdom.","Oprah Winfrey","celebrity","yes"],
["You get in life what you have the courage to ask for.","Oprah Winfrey","celebrity","yes"],
["Think like a queen. A queen is not afraid to fail.","Oprah Winfrey","celebrity","yes"],
["I've learned that people will forget what you said, but people will never forget how you made them feel.","Maya Angelou","celebrity","yes"],
["There is no greater agony than bearing an untold story inside you.","Maya Angelou","celebrity","yes"],
["You are enough just as you are.","Meghan Markle","celebrity","yes"],
["Above all, be the heroine of your life, not the victim.","Nora Ephron","celebrity","yes"],
["The question isn't who's going to let me; it's who is going to stop me.","Ayn Rand","celebrity","yes"],
["In a gentle way, you can shake the world.","Gandhi","celebrity","yes"],
["Life is either a daring adventure or nothing at all.","Helen Keller","celebrity","yes"],
["Well done is better than well said.","Benjamin Franklin","celebrity","yes"],
["Don't wait for the perfect moment. Take the moment and make it perfect.","Zoey Sayward","celebrity","yes"],
["You are not a drop in the ocean. You are the entire ocean in a drop.","Rumi","celebrity","yes"],
["Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.","Rumi","celebrity","no"],
["I restore myself when I'm alone.","Marilyn Monroe","celebrity","no"],
["Imperfection is beauty, madness is genius, and it's better to be absolutely ridiculous than absolutely boring.","Marilyn Monroe","celebrity","yes"],
["If you can dream it, you can do it.","Walt Disney","celebrity","yes"],
["All our dreams can come true, if we have the courage to pursue them.","Walt Disney","celebrity","yes"],
["Laughter is timeless. Imagination has no age. And dreams are forever.","Walt Disney","celebrity","yes"],
["The flower that blooms in adversity is the most rare and beautiful of all.","Mulan","movie","yes"],
["Bruh.","Internet","meme","no"],
["Sir, this is a Wendy's.","Internet","meme","no"],
["I'm in this photo and I don't like it.","Internet","meme","no"],
["Stonks.","Meme Man","meme","yes"],
["Task failed successfully.","Windows error","meme","no"],
["It's giving… yes.","Gen Z","meme","yes"],
["No thoughts, just vibes.","Internet","meme","no"],
["Understood the assignment.","Internet","meme","yes"],
["That's rough, buddy.","Zuko — Avatar","meme","no"],
["My goals are beyond your understanding.","Internet","meme","yes"],
["You know what, fair enough.","Internet","meme","yes"],
["We don't talk about Bruno.","Encanto","meme","no"],
["Let it go, let it go.","Elsa — Frozen","meme","no"],
["Is this a pigeon?","Anime meme","meme","no"],
["Ah shit, here we go again.","CJ — GTA","meme","no"],
["Rise and grind.","LinkedIn hustle culture","meme","yes"],
["Choose your fighter.","Internet","meme","yes"],
["Vibes only. No bad energy.","Instagram bio","meme","yes"],
["Plot twist.","Internet","meme","no"],
["Hold my beer.","The internet, always","meme","yes"],
["It's the vibe.","The Castle","meme","yes"],
["Change my mind.","Steven Crowder meme","meme","no"],
["I'm something of a scientist myself.","Green Goblin","meme","yes"],
["Perfectly balanced, as all things should be.","Thanos meme","meme","no"],
["I'll allow it.","Judge meme","meme","yes"],
["Reality can be whatever I want.","Thanos meme","meme","yes"]
];
const SIGNS = S.map(([text, source, type, verdict]) => ({ text, source, type, verdict }));

// ══════════════════════════════════════════════════════════════
// CARICATURES — minimalist wire SVGs
// ══════════════════════════════════════════════════════════════
const CL = "#e8734a"; // ember accent — used for all caricatures

const C = {
  kanye: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="42" rx="18" ry="22"/><path d="M42 36Q50 26 60 28Q70 26 78 36"/><line x1="42" y1="36" x2="48" y2="36"/><line x1="51" y1="36" x2="57" y2="36"/><line x1="63" y1="36" x2="69" y2="36"/><line x1="72" y1="36" x2="78" y2="36"/><path d="M54 50Q60 54 66 50"/><path d="M50 64Q60 72 70 64"/><circle cx="60" cy="74" r="3"/></g>),
  drake: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="42" rx="17" ry="21"/><path d="M46 48Q52 42 58 48"/><path d="M62 48Q68 42 74 48"/><path d="M50 56Q60 62 70 56"/><path d="M48 60Q60 70 72 60"/><path d="M44 34Q52 24 60 26Q68 24 76 34"/><circle cx="50" cy="45" r="1" fill={CL}/><circle cx="70" cy="45" r="1" fill={CL}/></g>),
  eminem: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 32L44 28Q60 22 76 28L76 32"/><line x1="48" y1="42" x2="54" y2="42"/><line x1="66" y1="42" x2="72" y2="42"/><circle cx="51" cy="42" r="1" fill={CL}/><circle cx="69" cy="42" r="1" fill={CL}/><line x1="54" y1="54" x2="66" y2="54"/><path d="M46 64L60 70L74 64"/></g>),
  biggie: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="20" ry="24"/><ellipse cx="52" cy="40" rx="6" ry="5"/><ellipse cx="68" cy="40" rx="6" ry="5"/><line x1="58" y1="40" x2="62" y2="40"/><circle cx="52" cy="40" r="2" fill={CL}/><circle cx="68" cy="40" r="2" fill={CL}/><path d="M52 54Q60 60 68 54"/><path d="M40 30Q60 18 80 30"/><path d="M44 30Q50 16 60 14Q70 16 76 30"/></g>),
  jayz: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="17" ry="21"/><line x1="50" y1="40" x2="56" y2="40"/><line x1="64" y1="40" x2="70" y2="40"/><circle cx="53" cy="40" r="1.5" fill={CL}/><circle cx="67" cy="40" r="1.5" fill={CL}/><path d="M52 52Q60 56 68 52"/><path d="M43 30Q60 20 77 30"/><path d="M45 30L45 22Q60 16 75 22L75 30"/></g>),
  kendrick: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="16" ry="20"/><path d="M44 34Q48 20 60 18Q72 20 76 34"/><path d="M44 34L40 46"/><path d="M76 34L80 46"/><circle cx="53" cy="42" r="2"/><circle cx="67" cy="42" r="2"/><circle cx="53" cy="42" r=".8" fill={CL}/><circle cx="67" cy="42" r=".8" fill={CL}/><path d="M54 54Q60 58 66 54"/><path d="M50 60Q60 66 70 60"/></g>),
  rihanna: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="16" ry="20"/><path d="M44 38Q42 22 56 20L64 18Q78 20 76 38"/><circle cx="53" cy="42" r="2"/><circle cx="67" cy="42" r="2"/><circle cx="53" cy="42" r=".8" fill={CL}/><circle cx="67" cy="42" r=".8" fill={CL}/><path d="M52 54Q60 60 68 54"/><path d="M52 56Q60 62 68 56"/><line x1="70" y1="66" x2="72" y2="72"/><circle cx="72" cy="74" r="2"/></g>),
  taylor: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="15" ry="19"/><path d="M45 38Q40 18 52 16Q60 14 68 16Q80 18 75 38"/><path d="M45 38Q42 60 44 76"/><path d="M75 38Q78 60 76 76"/><circle cx="54" cy="42" r="1.5"/><circle cx="66" cy="42" r="1.5"/><path d="M55 54Q60 57 65 54"/><path d="M56 56Q60 58 64 56"/></g>),
  beyonce: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="16" ry="20"/><path d="M44 36Q38 16 54 14Q60 12 66 14Q82 16 76 36"/><path d="M44 36Q36 40 38 56"/><path d="M76 36Q84 40 82 56"/><circle cx="53" cy="42" r="2"/><circle cx="67" cy="42" r="2"/><path d="M52 54Q60 60 68 54"/></g>),
  ariana: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="48" rx="14" ry="18"/><path d="M46 38Q46 10 60 8Q74 10 74 38"/><path d="M62 6Q68 2 66 16Q64 30 68 46"/><circle cx="54" cy="44" r="1.5"/><circle cx="66" cy="44" r="1.5"/><path d="M55 56Q60 58 65 56"/><line x1="46" y1="44" x2="42" y2="44"/><line x1="74" y1="44" x2="78" y2="44"/></g>),
  adele: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="17" ry="21"/><path d="M43 36Q38 20 52 16Q60 14 68 16Q82 20 77 36"/><path d="M43 36Q40 50 42 66"/><path d="M77 36Q80 50 78 66"/><circle cx="52" cy="42" r="2.5"/><circle cx="68" cy="42" r="2.5"/><path d="M48 42L46 40"/><path d="M72 42L74 40"/><circle cx="52" cy="42" r="1" fill={CL}/><circle cx="68" cy="42" r="1" fill={CL}/><path d="M52 56Q60 62 68 56"/></g>),
  miley: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="15" ry="19"/><path d="M45 34Q50 26 60 24Q70 26 75 34"/><path d="M45 34L42 28"/><path d="M75 34L78 28"/><circle cx="54" cy="42" r="1.5"/><circle cx="66" cy="42" r="1.5"/><path d="M50 54Q60 62 70 54"/><line x1="58" y1="58" x2="62" y2="62"/></g>),
  queen: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="16" ry="20"/><path d="M44 34Q44 18 60 16Q76 18 76 34"/><path d="M48 56Q60 52 72 56"/><path d="M48 58Q60 54 72 58"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M54 62Q60 66 66 62"/></g>),
  beatles: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="15" ry="19"/><path d="M45 40Q38 18 52 16Q60 14 68 16Q82 18 75 40"/><circle cx="54" cy="44" r="3"/><circle cx="66" cy="44" r="3"/><line x1="57" y1="44" x2="63" y2="44"/><circle cx="54" cy="44" r="1" fill={CL}/><circle cx="66" cy="44" r="1" fill={CL}/><path d="M55 56Q60 58 65 56"/></g>),
  elon: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="17" ry="22"/><path d="M43 32Q50 26 60 24Q70 26 77 32"/><circle cx="52" cy="42" r="1.5"/><circle cx="68" cy="42" r="1.5"/><line x1="54" y1="54" x2="66" y2="54"/><path d="M46 66L48 78Q60 82 72 78L74 66"/><line x1="60" y1="66" x2="60" y2="78"/></g>),
  jobs: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><circle cx="52" cy="40" r="5"/><circle cx="68" cy="40" r="5"/><line x1="57" y1="40" x2="63" y2="40"/><circle cx="52" cy="40" r="1.5" fill={CL}/><circle cx="68" cy="40" r="1.5" fill={CL}/><path d="M55 54Q60 56 65 54"/><path d="M46 64Q46 80 60 82Q74 80 74 64"/></g>),
  gates: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><rect x="48" y="38" width="10" height="7" rx="2"/><rect x="62" y="38" width="10" height="7" rx="2"/><line x1="58" y1="41" x2="62" y2="41"/><circle cx="53" cy="41" r="1" fill={CL}/><circle cx="67" cy="41" r="1" fill={CL}/><path d="M55 54Q60 57 65 54"/><path d="M44 30Q54 22 60 22Q66 22 76 30"/></g>),
  sinatra: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 30Q48 20 60 18Q72 20 76 30"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M54 54Q60 58 66 54"/><path d="M56 72L60 78L64 72"/></g>),
  jordan: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="42" rx="17" ry="20"/><circle cx="53" cy="40" r="1.5"/><circle cx="67" cy="40" r="1.5"/><path d="M52 52Q60 58 68 52"/><path d="M42 62Q44 50 44 44"/><path d="M78 62Q76 50 76 44"/></g>),
  ali: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="18" ry="22"/><path d="M42 32Q50 22 60 20Q70 22 78 32"/><circle cx="52" cy="40" r="2"/><circle cx="68" cy="40" r="2"/><path d="M50 54Q60 60 70 54"/><path d="M36 60L42 50"/><path d="M84 60L78 50"/></g>),
  yoda: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="48" rx="14" ry="16"/><path d="M46 44L28 36L42 46"/><path d="M74 44L92 36L78 46"/><circle cx="54" cy="44" r="2"/><circle cx="66" cy="44" r="2"/><circle cx="54" cy="44" r=".8" fill={CL}/><circle cx="66" cy="44" r=".8" fill={CL}/><path d="M56 56Q60 58 64 56"/></g>),
  joker: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="22"/><path d="M44 30Q40 14 50 10Q60 6 70 10Q80 14 76 30"/><circle cx="53" cy="40" r="2"/><circle cx="67" cy="40" r="2"/><path d="M44 52Q52 44 60 52Q68 44 76 52"/><line x1="44" y1="52" x2="40" y2="48"/><line x1="76" y1="52" x2="80" y2="48"/></g>),
  thanos: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="20" ry="24"/><path d="M40 44Q44 38 48 44"/><path d="M72 44Q76 38 80 44"/><circle cx="44" cy="42" r="1" fill={CL}/><circle cx="76" cy="42" r="1" fill={CL}/><line x1="50" y1="56" x2="70" y2="56"/><path d="M40 32Q50 22 60 20Q70 22 80 32"/><line x1="60" y1="20" x2="60" y2="14"/></g>),
  hulk: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="20" ry="22"/><path d="M40 32Q48 24 60 22Q72 24 80 32"/><rect x="46" y="38" width="8" height="5" rx="1"/><rect x="66" y="38" width="8" height="5" rx="1"/><line x1="54" y1="40" x2="66" y2="40"/><path d="M50 54Q60 62 70 54"/><path d="M36 66L42 60"/><path d="M84 66L78 60"/></g>),
  godfather: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="17" ry="22"/><path d="M43 32Q52 24 60 24Q68 24 77 32"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M54 56Q60 58 66 56"/><path d="M56 68L60 76L64 68"/></g>),
  michaelscott: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 32Q48 24 60 22Q72 24 76 32"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M50 52Q60 62 70 52"/><line x1="60" y1="64" x2="60" y2="70"/><path d="M56 70L60 76L64 70"/></g>),
  joey: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 32Q44 18 56 16Q60 14 64 16Q76 18 76 32"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M48 36L54 36"/><path d="M66 36L72 36"/><path d="M50 54Q60 60 70 54"/></g>),
  peralta: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 34Q50 24 60 22Q70 24 76 34"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M52 54Q60 58 68 54"/><path d="M46 66L74 66"/></g>),
  einstein: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="48" rx="16" ry="20"/><path d="M44 36Q36 14 48 10Q60 6 72 10Q84 14 76 36"/><path d="M40 30L34 22"/><path d="M80 30L86 22"/><circle cx="54" cy="44" r="2"/><circle cx="66" cy="44" r="2"/><path d="M54 58Q60 62 66 58"/><path d="M54 64Q60 68 66 64"/></g>),
  cowell: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 32Q50 24 60 22Q70 24 76 32"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M48 36L56 36"/><path d="M64 36L72 36"/><line x1="54" y1="54" x2="66" y2="54"/><path d="M52 66Q60 74 68 66"/></g>),
  mrbeast: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="16" ry="20"/><path d="M44 34Q50 26 60 24Q70 26 76 34"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M50 52Q60 62 70 52"/><path d="M48 34L48 30Q60 24 72 30L72 34"/></g>),
  sandberg: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="15" ry="19"/><path d="M45 36Q40 20 54 16Q60 14 66 16Q80 20 75 36"/><path d="M45 36Q42 50 44 66"/><path d="M75 36Q78 50 76 66"/><circle cx="54" cy="42" r="1.5"/><circle cx="66" cy="42" r="1.5"/><path d="M55 54Q60 57 65 54"/></g>),
  nike: () => (<g stroke={CL} fill="none" strokeWidth="2" strokeLinecap="round"><path d="M30 56Q46 52 60 40Q50 60 34 64" fill={CL} opacity=".3"/><path d="M30 56Q46 52 60 40"/></g>),
  apple: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M60 24Q64 18 68 22"/><path d="M48 34Q42 28 46 24Q52 20 60 26Q68 20 74 24Q78 28 72 34"/><path d="M48 34Q40 50 44 62Q50 70 60 70Q70 70 76 62Q80 50 72 34"/><path d="M60 26L60 22"/></g>),
  mcdonalds: () => (<g stroke={CL} fill="none" strokeWidth="2" strokeLinecap="round"><path d="M36 66L36 30Q36 24 42 24Q48 24 48 36L48 50Q48 24 54 24Q60 24 60 36"/><path d="M84 66L84 30Q84 24 78 24Q72 24 72 36L72 50Q72 24 66 24Q60 24 60 36"/></g>),
  cocacola: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M40 30Q36 30 36 38L36 56Q36 66 44 68L76 68Q84 66 84 56L84 38Q84 30 80 30"/><path d="M40 30L80 30"/><path d="M42 46Q60 40 78 46"/></g>),
  billboard: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><rect x="30" y="24" width="60" height="36" rx="2"/><line x1="50" y1="60" x2="50" y2="76"/><line x1="70" y1="60" x2="70" y2="76"/><line x1="44" y1="76" x2="76" y2="76"/><path d="M36 38L84 38"/><path d="M42 46L78 46"/></g>),
  spongebob: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><rect x="40" y="24" width="40" height="44" rx="4"/><circle cx="52" cy="40" r="5"/><circle cx="68" cy="40" r="5"/><circle cx="52" cy="40" r="2" fill={CL}/><circle cx="68" cy="40" r="2" fill={CL}/><path d="M46 56Q60 66 74 56"/><line x1="56" y1="58" x2="56" y2="64"/><line x1="64" y1="58" x2="64" y2="64"/></g>),
  internet: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><circle cx="60" cy="44" r="24"/><ellipse cx="60" cy="44" rx="10" ry="24"/><path d="M36 38Q60 34 84 38"/><path d="M36 50Q60 54 84 50"/><circle cx="60" cy="44" r="2" fill={CL}/></g>),
  tiktok: () => (<g stroke={CL} fill="none" strokeWidth="2" strokeLinecap="round"><path d="M56 24L56 58Q56 66 64 66Q72 66 72 58"/><path d="M56 36Q68 36 72 28Q76 20 80 20"/><circle cx="56" cy="58" r="10"/></g>),
  terminator: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="17" ry="21"/><path d="M44 34Q52 26 60 24Q68 26 76 34"/><rect x="44" y="38" width="12" height="6" rx="1"/><rect x="64" y="38" width="12" height="6" rx="1"/><line x1="56" y1="41" x2="64" y2="41"/><line x1="54" y1="56" x2="66" y2="56"/></g>),
  dinosaur: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="46" rx="22" ry="18"/><path d="M38 46Q30 38 34 30Q38 24 44 30L42 40"/><circle cx="52" cy="38" r="3"/><circle cx="52" cy="38" r="1.2" fill={CL}/><path d="M36 36L32 32L36 34L34 30L38 34"/><path d="M82 46Q90 50 94 48"/></g>),
  delorean: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M24 52L36 36L84 36L96 52L24 52"/><path d="M36 36L40 24L80 24L84 36"/><circle cx="38" cy="56" r="6"/><circle cx="82" cy="56" r="6"/><circle cx="38" cy="56" r="3"/><circle cx="82" cy="56" r="3"/></g>),
  rocky: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="17" ry="21"/><path d="M43 32Q50 24 60 22Q70 24 77 32"/><circle cx="53" cy="42" r="1.5"/><circle cx="67" cy="42" r="1.5"/><path d="M52 54Q60 58 68 54"/><path d="M36 58L42 48"/><path d="M84 58L78 48"/><path d="M36 58L30 50"/></g>),
  gandalf: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="48" rx="15" ry="18"/><path d="M45 36L50 10L60 6L70 10L75 36"/><path d="M48 56Q60 52 72 56"/><path d="M48 58Q60 54 72 58"/><path d="M48 60Q60 68 72 60"/><circle cx="54" cy="44" r="1.5"/><circle cx="66" cy="44" r="1.5"/></g>),
  dumbledore: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="48" rx="15" ry="18"/><path d="M45 36L50 14L60 10L70 14L75 36"/><circle cx="52" cy="42" r="4"/><circle cx="68" cy="42" r="4"/><line x1="56" y1="42" x2="64" y2="42"/><path d="M48 58Q60 54 72 58"/><path d="M48 62Q60 72 72 62"/></g>),
  spiderman: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="60" cy="44" rx="17" ry="22"/><path d="M43 36Q52 28 60 26Q68 28 77 36"/><path d="M46 40Q52 36 58 42"/><path d="M62 42Q68 36 74 40"/><path d="M60 26L60 16"/><path d="M52 20L60 16L68 20"/></g>),
  generic: () => (<g stroke={CL} fill="none" strokeWidth="1.5" strokeLinecap="round"><circle cx="60" cy="40" r="16"/><circle cx="54" cy="38" r="1.5"/><circle cx="66" cy="38" r="1.5"/><path d="M54 48Q60 52 66 48"/><line x1="60" y1="56" x2="60" y2="72"/><line x1="48" y1="64" x2="72" y2="64"/></g>),
};

// ── SOURCE → CARICATURE MAPPING ──
const SM = {
  "Kanye West":"kanye","Drake":"drake","Drake / The entire 2010s":"drake",
  "Eminem":"eminem","Eminem — Lose Yourself":"eminem",
  "Biggie Smalls":"biggie","Biggie Smalls — Juicy":"biggie",
  "Jay-Z":"jayz","Kendrick Lamar":"kendrick",
  "2Pac":"kendrick","Nas":"kendrick","Nas — The World Is Yours":"kendrick","Common":"kendrick","Pharrell":"kendrick",
  "Rihanna":"rihanna","Rihanna — press conference":"rihanna","Rihanna ft. T.I.":"rihanna","Rihanna — Take a Bow":"rihanna",
  "Taylor Swift":"taylor","Taylor Swift — Anti-Hero":"taylor","Taylor Swift — Bad Blood":"taylor",
  "Beyoncé":"beyonce","Beyoncé — Irreplaceable":"beyonce","Destiny's Child":"beyonce",
  "Ariana Grande":"ariana","Ariana Grande — 7 Rings":"ariana",
  "Adele":"adele","Miley Cyrus":"miley","Miley Cyrus — Flowers":"miley",
  "Queen":"queen","Queen — Bohemian Rhapsody":"queen","Queen & David Bowie":"queen",
  "The Beatles":"beatles","John Lennon":"beatles",
  "Elon Musk":"elon","Elon Musk — to MrBeast at the Super Bowl":"elon",
  "Steve Jobs":"jobs","Steve Jobs — Stanford, 2005":"jobs",
  "Bill Gates":"gates","Mark Zuckerberg":"gates","Jeff Bezos":"gates","Jack Dorsey":"gates",
  "Frank Sinatra":"sinatra",
  "Michael Jordan":"jordan","Michael Jordan — The Last Dance":"jordan","Kobe Bryant — Mamba Mentality":"jordan",
  "Wayne Gretzky — Michael Scott":"michaelscott",
  "Muhammad Ali":"ali",
  "Albert Einstein":"einstein",
  "Simon Cowell":"cowell","Simon Cowell — American Idol":"cowell",
  "MrBeast":"mrbeast","Sheryl Sandberg":"sandberg","Sheryl Sandberg — Lean In":"sandberg",
  "Yoda — Star Wars":"yoda","Star Wars":"yoda","Darth Vader — Star Wars":"yoda",
  "The Joker — The Dark Knight":"joker","Harvey Dent — The Dark Knight":"joker",
  "Thanos":"thanos","Thanos — Endgame":"thanos","Thanos meme":"thanos",
  "Hulk — Endgame":"hulk","Hulk — Avengers":"hulk",
  "The Godfather":"godfather","The Godfather Part II":"godfather","Gone with the Wind":"godfather","Casablanca":"godfather",
  "Michael Scott — The Office":"michaelscott","Jim Halpert — The Office":"michaelscott",
  "Joey — Friends":"joey","Ross — Friends":"joey","Chandler — Friends":"joey",
  "Jake Peralta — Brooklyn 99":"peralta",
  "The Terminator":"terminator",
  "Jurassic Park":"dinosaur",
  "Back to the Future":"delorean","Apollo 13":"delorean","Top Gun":"delorean",
  "Rocky":"rocky",
  "Gandalf — LOTR":"gandalf","Boromir — LOTR":"gandalf","Gollum — LOTR":"gandalf","Éowyn — LORT":"gandalf",
  "Dumbledore — Harry Potter":"dumbledore","Snape — Harry Potter":"dumbledore","Hermione — Harry Potter":"dumbledore",
  "Spider-Man":"spiderman","Iron Man":"spiderman","Captain America":"spiderman","Tony Stark — Avengers":"spiderman","Tony Stark — Endgame":"spiderman","Morgan Stark — Endgame":"spiderman",
  "Batman Begins":"joker",
  "Nike":"nike","Adidas":"nike",
  "Apple":"apple","Apple ad — Think Different":"apple",
  "McDonald's":"mcdonalds","Coca-Cola":"cocacola",
  "SpongeBob":"spongebob","The 'This is Fine' dog":"spongebob",
  "Internet":"internet","Everyone, everywhere":"internet","Corporate internet":"internet","Twitter / X":"internet","Twitter / X, 2023":"internet",
  "Gen Z":"tiktok","TikTok":"tiktok","TikTok sound":"tiktok","Instagram bio":"tiktok","LinkedIn hustle culture":"tiktok",
  "Forrest Gump":"michaelscott","Jerry Maguire":"michaelscott","Vanilla Sky":"michaelscott",
  "Arya Stark — GOT":"joker","Ned Stark — GOT":"joker","Ygritte — GOT":"joker","Game of Thrones":"joker","Tyrion — GOT":"joker",
  "Walter White — Breaking Bad":"terminator","Jesse Pinkman — Breaking Bad":"terminator","Doakes — Dexter":"terminator",
  "Barney — HIMYM":"joey","GOB — Arrested Development":"joey",
  "Oprah Winfrey":"beyonce","Maya Angelou":"beyonce",
  "Walt Disney":"michaelscott",
  "Simone Biles":"ariana","Serena Williams":"ariana","Venus Williams":"ariana",
  "Toy Story":"yoda","Dory — Finding Nemo":"yoda","The Lion King":"yoda","Mulan":"yoda","Shrek":"yoda","Encanto":"yoda","Elsa — Frozen":"yoda",
  "Katniss — Hunger Games":"taylor","Hunger Games":"taylor",
  "Shawshank Redemption":"godfather",
  "Mad Max: Fury Road":"terminator","There Will Be Blood":"terminator",
  "Black Panther":"thanos","Guardians of the Galaxy":"thanos",
  "The Wizard of Oz":"dumbledore","Hamlet":"dumbledore",
  "Dead Poets Society":"beatles","Midnight Cowboy":"sinatra","The Karate Kid":"ali",
  "Scarface":"godfather","Dirty Dancing":"taylor","Babe":"yoda","Taxi Driver":"terminator",
  "Titanic":"joey",
  "Jaws":"dinosaur",
  "The Weeknd":"drake","Post Malone":"drake","Lil Nas X":"drake",
  "Billie Eilish":"ariana","Dua Lipa":"ariana","Harry Styles":"beatles",
  "DJ Khaled":"biggie","DJ Khaled ft. everybody":"biggie",
  "Bruno Mars":"sinatra","Macklemore":"eminem",
  "Gloria Gaynor":"beyonce","Kelly Clarkson":"beyonce",
  "Simon & Garfunkel":"beatles",
  "Bob Marley":"kendrick","Bobby McFerrin":"kendrick",
  "Survivor":"queen","Bon Jovi":"queen","Bruce Springsteen":"queen","Elton John":"queen",
  "David Bowie":"queen","The Rolling Stones":"queen",
  "Aretha Franklin":"beyonce","Marvin Gaye":"sinatra","Bill Withers":"sinatra","Louis Armstrong":"sinatra",
  "The Supremes":"beyonce","Ray Charles":"sinatra",
  "Green Day":"eminem","Daft Punk":"internet","Pharrell Williams":"kendrick","Childish Gambino":"kendrick",
  "Journey":"queen","Starship":"queen",
  "Gotye":"beatles","NSYNC":"joey","Britney Spears":"taylor","Spice Girls":"beyonce","TLC":"beyonce",
  "a-ha":"beatles","Eurythmics":"queen","Tears for Fears":"beatles","Simple Minds":"beatles","Cyndi Lauper":"miley",
  "Def Leppard":"queen","Guns N' Roses":"queen","Nirvana":"eminem","Radiohead":"beatles","Bonnie Tyler":"adele",
  "Gojo Satoru — Jujutsu Kaisen":"spiderman","CJ — GTA":"internet","Anime meme":"internet","Meme Man":"internet","Windows error":"internet","Steven Crowder meme":"internet","Green Goblin":"spiderman","Judge meme":"internet","The Castle":"internet",
  "Douglas Adams":"einstein","Jack Handey":"michaelscott",
  "Rumi":"gandalf","Seneca":"einstein","Marcus Aurelius":"einstein","Marcus Aurelius / Ryan Holiday":"einstein","Nietzsche":"einstein","Nietzsche / Stoics":"einstein","Stoic Philosophy":"einstein","Heraclitus":"einstein","Socrates":"einstein","Descartes":"einstein","Jean-Paul Sartre":"einstein","Confucius":"einstein","Buddha":"einstein","Dalai Lama":"gandalf","Lao Tzu":"gandalf","Hafiz":"gandalf",
  "Oscar Wilde":"sinatra","Anaïs Nin":"taylor","Marilyn Monroe":"taylor",
  "Joseph Campbell":"gandalf","Hillel the Elder":"gandalf","Oracle at Delphi":"gandalf",
  "Thoreau":"einstein","Robert Frost":"einstein","Aristotle":"einstein","Leonardo da Vinci":"einstein","Pablo Picasso":"einstein","Mies van der Rohe":"einstein",
  "Gandhi":"gandalf","Nelson Mandela":"gandalf","MLK Jr.":"gandalf","FDR":"godfather","Theodore Roosevelt":"godfather","Henry Ford":"godfather","Thomas Edison":"einstein","Benjamin Franklin":"einstein",
  "J.R.R. Tolkien":"gandalf","Nora Ephron":"sandberg","Ayn Rand":"sandberg","Helen Keller":"sandberg","Meghan Markle":"sandberg","Whoopi Goldberg":"beyonce",
  "Carl Jung":"einstein","Suzy Kassem":"sandberg","Mark Twain":"sinatra","Milton Berle":"sinatra","Zoey Sayward":"sandberg",
  "Misattributed to Gandhi":"gandalf",
  "Michael Phelps":"jordan","Michael Johnson":"jordan","Arthur Ashe":"jordan","Tim Notke":"jordan","Pelé":"jordan","Ronaldinho":"jordan","Cristiano Ronaldo":"jordan","Lionel Messi":"jordan","Jackie Joyner-Kersee":"jordan","Billie Jean King":"jordan","Vince Lombardi":"jordan","Yogi Berra":"jordan","Katie Ledecky":"ariana","Lindsey Vonn":"ariana","Simone Biles":"ariana","Lance Armstrong":"jordan",
  "Reid Hoffman":"gates","Guy Kawasaki":"gates","Seth Godin":"gates","Paul Graham":"gates","Ash Maurya":"gates","Peter Drucker":"gates",
  "Y Combinator":"billboard","Amazon Leadership Principle":"billboard","Silicon Valley Mantra":"billboard",
  "Every PM ever":"internet","Every meeting ever":"internet","Every extreme sports video":"internet","Gamers everywhere":"internet","The internet, always":"internet","The internet, 2019":"internet","We're the Millers":"michaelscott","Yoga studio sign":"billboard",
  "Unknown":"generic",
  // Remaining billboards
  "L'Oréal":"billboard","Energizer":"billboard","Disneyland":"billboard","Levi's":"billboard",
  "Netflix":"billboard","Netflix — LA":"billboard","Taco Bell":"billboard","De Beers":"billboard",
  "Avis":"billboard","Specsavers":"billboard","Visa":"billboard","KFC":"billboard","Heinz":"billboard",
  "Kit Kat":"billboard","M&M's":"billboard","Gillette":"billboard","Red Bull":"billboard",
  "Dr Pepper":"billboard","Maybelline":"billboard","Guinness":"billboard","Kay Jewelers":"billboard",
  "Wendy's":"billboard","Skittles":"billboard","BMW":"billboard",
};

const getC = (src) => { const k = SM[src]; return (C[k] || C.generic)(); };

// ── CHANNELING MESSAGES ──
const CH = [
  "The stars are shifting into alignment…",
  "Something is stirring in the ether…",
  "The veil between worlds grows thin…",
  "A message is forming in the silence…",
  "The cosmos is rearranging itself for you…",
  "Voices from beyond are gathering…",
  "Your energy is being read…",
  "The universe has noticed you…",
  "Threads of fate are being woven…",
  "Ancient frequencies are resonating…",
  "A sign is traveling toward you…",
  "The celestial plane is responding…",
  "Echoes from the collective soul…",
  "The answer is finding its way to you…",
  "Destiny is clearing a path…",
  "Something wants to be heard…",
];

const getRand = (ex) => {
  const a = SIGNS.filter((_,i) => !ex.includes(i));
  if (!a.length) return { sign: SIGNS[0], index: 0 };
  const s = a[Math.floor(Math.random() * a.length)];
  return { sign: s, index: SIGNS.indexOf(s) };
};

const Dot = ({ v, on }) => (
  <div style={{
    width: on?12:8, height: on?12:8, borderRadius:"50%",
    background: !on?"rgba(255,255,255,.08)":v==="yes"?"#6ee7b7":"#fca5a5",
    boxShadow: on?`0 0 8px ${v==="yes"?"rgba(110,231,183,.4)":"rgba(252,165,165,.4)"}`:"none",
    transition:"all .4s ease",
  }}/>
);

export default function App() {
  const [ph, setPh] = useState("idle");
  const [sign, setSign] = useState(null);
  const [rds, setRds] = useState([]);
  const [mode, setMode] = useState(null);
  const [used, setUsed] = useState([]);
  const [fin, setFin] = useState(null);
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(0);
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [shareStatus, setShareStatus] = useState(null); // null | "copying" | "copied" | "shared"
  const holdTimer = useRef(null);
  const holdStart = useRef(null);
  const cardRef = useRef(null);
  const HOLD_DURATION = 1200; // ms to hold

  const yC = rds.filter(r=>r.verdict==="yes").length;
  const nC = rds.filter(r=>r.verdict==="no").length;

  const reveal = useCallback(() => {
    setPh("ch"); setStep(0);
    const ms = [...CH].sort(()=>Math.random()-.5).slice(0,3);
    setMsg(ms[0]);
    const t1=setTimeout(()=>{setMsg(ms[1]);setStep(1)},1100);
    const t2=setTimeout(()=>{setMsg(ms[2]);setStep(2)},2200);
    const t3=setTimeout(()=>{
      const{sign:s,index}=getRand(used);
      setUsed(p=>[...p,index]);setSign(s);setPh("show");
    },3200);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3)};
  },[used]);

  const go=()=>{if(!mode){setRds([]);setFin(null);}reveal()};
  const bo=(n)=>{if(sign)setRds([{...sign}]);setMode(n);setFin(null);setSign(null);setPh("idle")};

  const startHold = () => {
    if(ph==="ch"||ph==="done") return;
    setHolding(true);
    holdStart.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - holdStart.current;
      const p = Math.min(elapsed / HOLD_DURATION, 1);
      setHoldProgress(p);
      if(p >= 1) {
        setHolding(false);
        setHoldProgress(0);
        go();
      } else {
        holdTimer.current = requestAnimationFrame(tick);
      }
    };
    holdTimer.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    setHolding(false);
    setHoldProgress(0);
    if(holdTimer.current) cancelAnimationFrame(holdTimer.current);
  };

  const shareSign = async () => {
    if(!cardRef.current || !sign) return;
    setShareStatus("copying");
    try {
      // Build a canvas manually — no external lib needed
      const card = cardRef.current;
      const w = 600, h = 400;
      const canvas = document.createElement("canvas");
      canvas.width = w * 2; canvas.height = h * 2;
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);

      // Background
      const bg = ctx.createRadialGradient(300, 200, 0, 300, 200, 350);
      bg.addColorStop(0, "#1a110c"); bg.addColorStop(1, "#060403");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      // Card bg
      ctx.fillStyle = "rgba(232,115,74,0.03)";
      ctx.beginPath(); ctx.roundRect(40, 30, 520, 340, 20); ctx.fill();
      ctx.strokeStyle = "rgba(232,115,74,0.1)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(40, 30, 520, 340, 20); ctx.stroke();

      // Quote
      ctx.fillStyle = "#f0ebe4";
      ctx.font = "italic 28px 'Cormorant Garamond', Georgia, serif";
      ctx.textAlign = "center";
      const quoteText = `"${sign.text}"`;
      const words = quoteText.split(" ");
      let lines = []; let line = "";
      for (const word of words) {
        const test = line + word + " ";
        if (ctx.measureText(test).width > 440 && line) { lines.push(line.trim()); line = word + " "; }
        else { line = test; }
      }
      lines.push(line.trim());
      const startY = 170 - (lines.length * 18);
      lines.forEach((l, i) => { ctx.fillText(l, 300, startY + i * 38); });

      // Source
      ctx.fillStyle = "rgba(232,115,74,0.65)";
      ctx.font = "400 15px 'Cinzel', serif";
      ctx.letterSpacing = "3px";
      ctx.fillText(`— ${sign.source}`, 300, startY + lines.length * 38 + 30);

      // Branding
      ctx.fillStyle = "rgba(232,115,74,0.4)";
      ctx.font = "italic 16px 'Cormorant Garamond', Georgia, serif";
      ctx.fillText("give-a-sign.vercel.app", 300, 360);

      // Stars decoration
      ctx.fillStyle = "rgba(232,115,74,0.3)";
      [[80,50],[520,60],[90,340],[510,330],[300,25]].forEach(([x,y]) => {
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      });

      const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
      const file = new File([blob], "give-me-a-sign.png", { type: "image/png" });

      // Try native share first (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Give Me a Sign",
          text: `"${sign.text}" — ${sign.source}\n\nNeed a sign? → https://give-a-sign.vercel.app`,
          files: [file],
        });
        setShareStatus("shared");
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        setShareStatus("copied");
      }
    } catch (e) {
      // If clipboard fails, try text-only
      try {
        await navigator.clipboard.writeText(`"${sign.text}" — ${sign.source}\n\nNeed a sign? → https://give-a-sign.vercel.app`);
        setShareStatus("copied");
      } catch {
        setShareStatus(null);
      }
    }
    setTimeout(() => setShareStatus(null), 2500);
  };

  useEffect(()=>{
    if(ph==="show"&&sign&&mode){
      const u=[...rds,{...sign}];setRds(u);
      if(u.length>=mode)setTimeout(()=>{setPh("done");setFin("done")},2200);
    }
  },[ph,sign]);

  const reset=()=>{setPh("idle");setSign(null);setRds([]);setMode(null);setUsed([]);setFin(null)};

  return (
    <div style={{
      minHeight:"100vh",
      background:"radial-gradient(ellipse at 50% 20%,#1a110c 0%,#0d0906 50%,#060403 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",
      fontFamily:"'Cormorant Garamond',Georgia,serif",color:"#f0ebe4",position:"relative",paddingTop:"clamp(60px, 15vh, 140px)",paddingBottom:40,paddingLeft:20,paddingRight:20,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Cinzel:wght@400;500;600;700&family=Raleway:wght@200;300;400&display=swap');
        *{box-sizing:border-box}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInSlow{from{opacity:0}to{opacity:1}}
        @keyframes breathe{0%,100%{box-shadow:0 0 20px rgba(232,115,74,.12)}50%{box-shadow:0 0 50px rgba(232,115,74,.25),0 0 100px rgba(232,115,74,.06)}}
        @keyframes mysticalPulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}}
        @keyframes dotP{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes orbPulse{0%,100%{transform:scale(1);box-shadow:0 0 30px rgba(232,115,74,.15),0 0 60px rgba(232,115,74,.05)}50%{transform:scale(1.04);box-shadow:0 0 50px rgba(232,115,74,.3),0 0 100px rgba(232,115,74,.1)}}
        @keyframes ringRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes ringRotateR{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}
        @keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
        @keyframes textGlow{0%,100%{opacity:.5}50%{opacity:.9}}
        @keyframes floatStar{0%,100%{transform:translateY(0) scale(1);opacity:.3}50%{transform:translateY(-4px) scale(1.2);opacity:.8}}
        @keyframes cardReveal{from{opacity:0;transform:translateY(24px) scale(.97);filter:blur(4px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
        @keyframes channelFade{0%{opacity:0;transform:translateY(8px);filter:blur(2px)}20%{opacity:1;transform:translateY(0);filter:blur(0)}80%{opacity:1;transform:translateY(0);filter:blur(0)}100%{opacity:0;transform:translateY(-6px);filter:blur(1px)}}
        @keyframes constellationDraw{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
        .opt{border:1px solid rgba(232,115,74,.15);cursor:pointer;background:transparent;color:rgba(232,115,74,.45);font-family:'Raleway',sans-serif;font-weight:300;font-size:11px;padding:10px 28px;border-radius:100px;transition:all .4s ease;letter-spacing:.2em;text-transform:uppercase}
        .opt:hover{background:rgba(232,115,74,.06);border-color:rgba(232,115,74,.35);color:rgba(232,115,74,.8);transform:translateY(-1px)}
        .rst{border:none;cursor:pointer;background:none;color:rgba(232,115,74,.18);font-family:'Raleway',sans-serif;font-weight:300;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:8px 16px;transition:color .3s}
        .rst:hover{color:rgba(232,115,74,.45)}
      `}</style>

      {/* ── CELESTIAL BACKGROUND — constellations only ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 420 900" preserveAspectRatio="xMidYMid slice">

          {/* ── ARIES ♈ — top-left ── */}
          <g opacity=".7">
            <circle cx="45" cy="70" r="2.5" fill="#e8734a"><animate attributeName="opacity" values=".3;.7;.3" dur="4s" repeatCount="indefinite"/></circle>
            <circle cx="65" cy="85" r="1.8" fill="#e8734a" opacity=".5"/>
            <circle cx="80" cy="105" r="2" fill="#e8734a" opacity=".45"><animate attributeName="opacity" values=".2;.55;.2" dur="3.5s" begin=".5s" repeatCount="indefinite"/></circle>
            <circle cx="95" cy="95" r="1.5" fill="#e8734a" opacity=".4"/>
            <line x1="45" y1="70" x2="65" y2="85" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="65" y1="85" x2="80" y2="105" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="80" y1="105" x2="95" y2="95" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
          </g>

          {/* ── LEO ♌ — top-right ── */}
          <g opacity=".65">
            <circle cx="340" cy="80" r="2.8" fill="#e8734a"><animate attributeName="opacity" values=".25;.6;.25" dur="4.5s" begin=".3s" repeatCount="indefinite"/></circle>
            <circle cx="355" cy="105" r="1.5" fill="#e8734a" opacity=".45"/>
            <circle cx="370" cy="90" r="1.8" fill="#e8734a" opacity=".4"/>
            <circle cx="385" cy="110" r="1.2" fill="#e8734a" opacity=".35"/>
            <circle cx="365" cy="130" r="2" fill="#e8734a" opacity=".5"><animate attributeName="opacity" values=".2;.5;.2" dur="3s" begin="1s" repeatCount="indefinite"/></circle>
            <circle cx="345" cy="140" r="1.5" fill="#e8734a" opacity=".35"/>
            <line x1="340" y1="80" x2="355" y2="105" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="355" y1="105" x2="370" y2="90" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="370" y1="90" x2="385" y2="110" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="355" y1="105" x2="365" y2="130" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="365" y1="130" x2="345" y2="140" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
          </g>

          {/* ── SCORPIO ♏ — mid-left ── */}
          <g opacity=".6">
            <circle cx="20" cy="350" r="2" fill="#e8734a"><animate attributeName="opacity" values=".2;.5;.2" dur="5s" begin="1.5s" repeatCount="indefinite"/></circle>
            <circle cx="35" cy="370" r="1.5" fill="#e8734a" opacity=".4"/>
            <circle cx="50" cy="365" r="1.8" fill="#e8734a" opacity=".45"/>
            <circle cx="65" cy="380" r="1.2" fill="#e8734a" opacity=".35"/>
            <circle cx="75" cy="395" r="2" fill="#e8734a" opacity=".4"/>
            <circle cx="60" cy="410" r="1.5" fill="#e8734a" opacity=".35"><animate attributeName="opacity" values=".15;.45;.15" dur="4s" begin="2s" repeatCount="indefinite"/></circle>
            <circle cx="45" cy="420" r="1.8" fill="#e8734a" opacity=".4"/>
            <circle cx="55" cy="435" r="1.2" fill="#e8734a" opacity=".3"/>
            <circle cx="70" cy="440" r="1.5" fill="#e8734a" opacity=".35"/>
            <line x1="20" y1="350" x2="35" y2="370" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="35" y1="370" x2="50" y2="365" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="50" y1="365" x2="65" y2="380" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="65" y1="380" x2="75" y2="395" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="75" y1="395" x2="60" y2="410" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="60" y1="410" x2="45" y2="420" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="45" y1="420" x2="55" y2="435" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="55" y1="435" x2="70" y2="440" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
          </g>

          {/* ── GEMINI ♊ — mid-right ── */}
          <g opacity=".6">
            <circle cx="370" cy="380" r="2.2" fill="#e8734a"><animate attributeName="opacity" values=".2;.55;.2" dur="4.2s" begin=".8s" repeatCount="indefinite"/></circle>
            <circle cx="385" cy="400" r="1.5" fill="#e8734a" opacity=".4"/>
            <circle cx="395" cy="420" r="1.8" fill="#e8734a" opacity=".45"/>
            <circle cx="375" cy="430" r="1.2" fill="#e8734a" opacity=".3"/>
            <circle cx="360" cy="405" r="2" fill="#e8734a" opacity=".4"/>
            <circle cx="350" cy="425" r="1.5" fill="#e8734a" opacity=".35"/>
            <line x1="370" y1="380" x2="385" y2="400" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="385" y1="400" x2="395" y2="420" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="370" y1="380" x2="360" y2="405" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="360" y1="405" x2="350" y2="425" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="385" y1="400" x2="360" y2="405" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="395" y1="420" x2="375" y2="430" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
          </g>

          {/* ── PISCES ♓ — bottom-left ── */}
          <g opacity=".6">
            <circle cx="30" cy="680" r="1.8" fill="#e8734a"><animate attributeName="opacity" values=".2;.5;.2" dur="3.8s" begin="2s" repeatCount="indefinite"/></circle>
            <circle cx="50" cy="695" r="1.5" fill="#e8734a" opacity=".4"/>
            <circle cx="70" cy="690" r="2" fill="#e8734a" opacity=".45"/>
            <circle cx="85" cy="710" r="1.2" fill="#e8734a" opacity=".35"/>
            <circle cx="65" cy="725" r="1.8" fill="#e8734a" opacity=".4"/>
            <circle cx="45" cy="730" r="1.5" fill="#e8734a" opacity=".35"><animate attributeName="opacity" values=".15;.4;.15" dur="5s" begin="1s" repeatCount="indefinite"/></circle>
            <circle cx="55" cy="750" r="1.2" fill="#e8734a" opacity=".3"/>
            <line x1="30" y1="680" x2="50" y2="695" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="50" y1="695" x2="70" y2="690" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="70" y1="690" x2="85" y2="710" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="70" y1="690" x2="65" y2="725" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="65" y1="725" x2="45" y2="730" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="45" y1="730" x2="55" y2="750" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
          </g>

          {/* ── SAGITTARIUS ♐ — bottom-right ── */}
          <g opacity=".65">
            <circle cx="340" cy="700" r="2.5" fill="#e8734a"><animate attributeName="opacity" values=".25;.6;.25" dur="4s" begin="1.2s" repeatCount="indefinite"/></circle>
            <circle cx="360" cy="685" r="1.5" fill="#e8734a" opacity=".4"/>
            <circle cx="375" cy="705" r="2" fill="#e8734a" opacity=".45"/>
            <circle cx="390" cy="720" r="1.2" fill="#e8734a" opacity=".35"/>
            <circle cx="365" cy="730" r="1.8" fill="#e8734a" opacity=".4"/>
            <circle cx="350" cy="745" r="1.5" fill="#e8734a" opacity=".35"/>
            <circle cx="380" cy="740" r="1" fill="#e8734a" opacity=".25"/>
            <line x1="340" y1="700" x2="360" y2="685" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="360" y1="685" x2="375" y2="705" stroke="#e8734a" strokeWidth=".7" opacity=".2"/>
            <line x1="375" y1="705" x2="390" y2="720" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="375" y1="705" x2="365" y2="730" stroke="#e8734a" strokeWidth=".6" opacity=".18"/>
            <line x1="365" y1="730" x2="350" y2="745" stroke="#e8734a" strokeWidth=".5" opacity=".15"/>
            <line x1="365" y1="730" x2="380" y2="740" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
          </g>

          {/* ── ORION (bonus — the hunter, universally recognizable) — center-top ── */}
          <g opacity=".5">
            <circle cx="220" cy="200" r="1.5" fill="#e8734a" opacity=".35"/>
            <circle cx="240" cy="215" r="2" fill="#e8734a" opacity=".4"><animate attributeName="opacity" values=".2;.5;.2" dur="3.5s" begin="2.5s" repeatCount="indefinite"/></circle>
            <circle cx="230" cy="235" r="1.2" fill="#e8734a" opacity=".3"/>
            <circle cx="235" cy="225" r="1" fill="#e8734a" opacity=".35"/>
            <circle cx="225" cy="225" r="1" fill="#e8734a" opacity=".35"/>
            <circle cx="250" cy="245" r="1.5" fill="#e8734a" opacity=".3"/>
            <circle cx="215" cy="250" r="1.5" fill="#e8734a" opacity=".3"/>
            <line x1="220" y1="200" x2="240" y2="215" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="225" y1="225" x2="235" y2="225" stroke="#e8734a" strokeWidth=".6" opacity=".15"/>
            <line x1="230" y1="225" x2="230" y2="235" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="240" y1="215" x2="250" y2="245" stroke="#e8734a" strokeWidth=".5" opacity=".12"/>
            <line x1="220" y1="200" x2="215" y2="250" stroke="#e8734a" strokeWidth=".5" opacity=".1"/>
          </g>

          {/* ── Scattered lone stars ── */}
          <circle cx="180" cy="50" r="1" fill="#e8734a" opacity=".2"/>
          <circle cx="300" cy="300" r=".8" fill="#e8734a" opacity=".18"/>
          <circle cx="150" cy="500" r=".7" fill="#e8734a" opacity=".15"/>
          <circle cx="200" cy="600" r=".6" fill="#e8734a" opacity=".12"/>
          <circle cx="400" cy="550" r=".8" fill="#e8734a" opacity=".15"/>
          <circle cx="250" cy="820" r="1" fill="#e8734a" opacity=".18"/>
          <circle cx="160" cy="850" r=".8" fill="#e8734a" opacity=".15"/>
          <circle cx="15" cy="250" r="1" fill="#e8734a" opacity=".2"><animate attributeName="opacity" values=".1;.3;.1" dur="6s" begin="3s" repeatCount="indefinite"/></circle>
          <circle cx="130" cy="160" r=".6" fill="#e8734a" opacity=".12"/>
          <circle cx="280" cy="550" r=".8" fill="#e8734a" opacity=".15"/>
          <circle cx="100" cy="580" r=".6" fill="#e8734a" opacity=".1"/>
          <circle cx="310" cy="480" r=".7" fill="#e8734a" opacity=".12"/>
        </svg>
      </div>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:ph==="idle"&&!mode?56:28,zIndex:2,animation:"fadeIn 1.2s ease",transition:"margin .6s ease",width:"100%",maxWidth:600,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{fontSize:10,fontFamily:"'Cinzel',serif",fontWeight:400,letterSpacing:".4em",textTransform:"uppercase",color:"rgba(255,220,200,.3)",marginBottom:16,whiteSpace:"nowrap"}}>
          ✦&nbsp;&nbsp;What's the universe telling you?&nbsp;&nbsp;✦
        </div>
        <h1 style={{
          fontSize:ph==="idle"&&!mode?"clamp(38px,10vw,64px)":"clamp(28px,6vw,40px)",
          fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:300,fontStyle:"italic",margin:"0 auto",
          background:"linear-gradient(135deg,#f0ebe4 0%,#e8734a 35%,#f0ebe4 65%,#e8734a 100%)",
          backgroundSize:"300% auto",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent",
          lineHeight:1.15,animation:"shimmer 6s linear infinite",transition:"font-size .6s ease",
          textAlign:"center",width:"100%",
        }}>Give Me a Sign</h1>
        {ph==="idle"&&!mode&&(
          <p style={{fontSize:14,fontFamily:"'Raleway',sans-serif",fontWeight:300,color:"rgba(255,220,200,.35)",letterSpacing:".06em",lineHeight:1.9,textAlign:"center",margin:"20px auto 0",maxWidth:360,animation:"fadeIn 2s ease .5s both"}}>
            you already know the answer —<br/>you just need to hear it from somewhere else
          </p>
        )}
      </div>

      {/* Mode dots */}
      {mode&&!fin&&(
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,animation:"fadeIn .4s ease",zIndex:2}}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"rgba(255,220,200,.25)",letterSpacing:".25em",textTransform:"uppercase"}}>Best of {mode}</span>
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            {rds.map((_,i)=><div key={i} style={{width:12,height:12,borderRadius:"50%",background:"rgba(232,115,74,.5)",boxShadow:"0 0 8px rgba(232,115,74,.3)",transition:"all .4s ease"}}/>)}
            {Array.from({length:Math.max(0,mode-rds.length)}).map((_,i)=><div key={`e${i}`} style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,255,255,.08)",transition:"all .4s ease"}}/>)}
          </div>
        </div>
      )}

      {/* Channeling */}
      {ph==="ch"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,marginBottom:28,zIndex:2,minHeight:160,justifyContent:"center"}}>
          {/* Mystical symbol */}
          <div style={{position:"relative",width:64,height:64}}>
            <svg viewBox="0 0 64 64" style={{width:64,height:64,animation:"ringRotate 8s linear infinite",opacity:.3}}>
              <circle cx="32" cy="32" r="28" fill="none" stroke="#e8734a" strokeWidth=".5" strokeDasharray="4 6"/>
              <circle cx="32" cy="32" r="20" fill="none" stroke="#e8734a" strokeWidth=".3" strokeDasharray="2 4"/>
            </svg>
            {[0,1,2].map(i=>(
              <div key={i} style={{
                position:"absolute",width:4,height:4,borderRadius:"50%",background:"#e8734a",
                left:30+Math.cos(step*2.1+i*2.094)*22,top:30+Math.sin(step*2.1+i*2.094)*22,
                opacity:step===i?1:.15,transition:"all .6s ease",animation:`dotP 1.5s ${i*.5}s ease-in-out infinite`,
              }}/>
            ))}
          </div>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:16,fontStyle:"italic",fontWeight:300,color:"rgba(255,220,200,.4)",letterSpacing:".04em",animation:"channelFade 1.1s ease-in-out",textAlign:"center",lineHeight:1.6,maxWidth:300}}>
            {msg}
          </p>
        </div>
      )}

      {/* SIGN CARD */}
      {ph==="show"&&sign&&!fin&&(
        <div style={{maxWidth:420,width:"100%",zIndex:2,marginBottom:8,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div ref={cardRef} style={{
            width:"100%",animation:"cardReveal 1s cubic-bezier(.16,1,.3,1)",
            background:"rgba(232,115,74,.015)",border:"1px solid rgba(232,115,74,.08)",borderRadius:20,overflow:"hidden",
          }}>
            <div style={{
              padding:"32px 20px 16px",display:"flex",flexDirection:"column",alignItems:"center",
              background:"radial-gradient(ellipse at 50% 80%,rgba(232,115,74,.05),transparent 70%)",
            }}>
              <svg viewBox="0 0 120 80" style={{width:130,height:88,opacity:.8,animation:"fadeInSlow 1.2s ease"}}>{getC(sign.source)}</svg>
            </div>
            <div style={{padding:"20px 32px 32px",textAlign:"center"}}>
              <p style={{fontSize:"clamp(18px,4.5vw,24px)",fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",lineHeight:1.7,margin:"0 0 16px 0",fontWeight:400,color:"#f0ebe4",animation:"fadeIn 1.2s ease .3s both"}}>
                "{sign.text}"
              </p>
              <p style={{fontSize:12,fontFamily:"'Cinzel',serif",fontWeight:400,color:"rgba(232,115,74,.45)",letterSpacing:".08em",margin:0,animation:"fadeIn 1.2s ease .6s both"}}>
                — {sign.source}
              </p>
            </div>
          </div>
          {/* Share button */}
          <button onClick={shareSign} disabled={shareStatus==="copying"} style={{
            marginTop:16,border:"none",cursor:"pointer",background:"none",
            display:"flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:100,
            transition:"all .3s ease",opacity:shareStatus?"1":".6",
          }}>
            <svg viewBox="0 0 20 20" style={{width:16,height:16,opacity:.5}}>
              <path d="M13 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 13a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#e8734a"/>
              <line x1="9" y1="9" x2="11" y2="6" stroke="#e8734a" strokeWidth=".8" opacity=".4"/>
              <line x1="9" y1="11" x2="11" y2="14" stroke="#e8734a" strokeWidth=".8" opacity=".4"/>
            </svg>
            <span style={{fontFamily:"'Raleway',sans-serif",fontSize:11,fontWeight:300,letterSpacing:".1em",
              color:shareStatus==="copied"||shareStatus==="shared"?"rgba(110,231,183,.7)":"rgba(255,220,200,.3)",
              transition:"color .3s ease",textTransform:"uppercase",
            }}>
              {shareStatus==="copying"?"creating image…":shareStatus==="copied"?"copied to clipboard ✓":shareStatus==="shared"?"shared ✓":"share this with someone"}
            </span>
          </button>
        </div>
      )}

      {/* Final — no verdict, let them interpret */}
      {fin&&(
        <div style={{
          maxWidth:420,width:"100%",padding:"44px 28px",
          border:"1px solid rgba(232,115,74,.08)",
          borderRadius:20,textAlign:"center",animation:"cardReveal 1s cubic-bezier(.16,1,.3,1)",zIndex:2,marginBottom:20,
          background:"radial-gradient(ellipse at center,rgba(232,115,74,.03),transparent 70%)",
        }}>
          <div style={{fontSize:10,fontFamily:"'Cinzel',serif",color:"rgba(255,220,200,.3)",letterSpacing:".3em",textTransform:"uppercase",marginBottom:24}}>The signs have spoken</div>
          <h2 style={{fontSize:30,fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",fontWeight:300,color:"#f0ebe4",margin:"0 0 20px 0"}}>Now you decide.</h2>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
            {rds.map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"rgba(232,115,74,.3)",boxShadow:"0 0 6px rgba(232,115,74,.15)"}}/>)}
          </div>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,220,200,.2)",letterSpacing:".12em"}}>{rds.length} signs channeled</p>
        </div>
      )}

      {/* THE ORB — hold to channel */}
      {ph!=="done"&&(
        <div style={{zIndex:2,marginBottom:20,display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          {/* Wrapper for orb + sacred geometry */}
          <div style={{position:"relative",width:"clamp(340px, 50vw, 460px)",height:"clamp(340px, 50vw, 460px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {/* Sacred geometry — centered behind orb */}
            <svg style={{position:"absolute",width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="150" fill="none" stroke="#e8734a" strokeWidth=".4" opacity=".05">
                <animateTransform attributeName="transform" type="rotate" values="0 160 160;360 160 160" dur="120s" repeatCount="indefinite"/>
              </circle>
              <circle cx="160" cy="160" r="115" fill="none" stroke="#e8734a" strokeWidth=".4" opacity=".06">
                <animateTransform attributeName="transform" type="rotate" values="360 160 160;0 160 160" dur="90s" repeatCount="indefinite"/>
              </circle>
              <circle cx="160" cy="160" r="80" fill="none" stroke="#e8734a" strokeWidth=".5" opacity=".07"/>
              <polygon points="160,80 240,160 160,240 80,160" fill="none" stroke="#e8734a" strokeWidth=".4" opacity=".04"/>
              <polygon points="160,100 220,160 160,220 100,160" fill="none" stroke="#e8734a" strokeWidth=".3" opacity=".035"/>
              <line x1="160" y1="80" x2="160" y2="240" stroke="#e8734a" strokeWidth=".25" opacity=".03"/>
              <line x1="80" y1="160" x2="240" y2="160" stroke="#e8734a" strokeWidth=".25" opacity=".03"/>
              <circle cx="160" cy="80" r="1.5" fill="#e8734a" opacity=".12"/>
              <circle cx="240" cy="160" r="1.5" fill="#e8734a" opacity=".12"/>
              <circle cx="160" cy="240" r="1.5" fill="#e8734a" opacity=".12"/>
              <circle cx="80" cy="160" r="1.5" fill="#e8734a" opacity=".12"/>
            </svg>
            {/* Orb interactive area */}
            <div
              onMouseDown={ph!=="ch"?startHold:undefined}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={ph!=="ch"?(e)=>{e.preventDefault();startHold()}:undefined}
              onTouchEnd={endHold}
              style={{
                position:"relative",width:"clamp(200px, 28vw, 260px)",height:"clamp(200px, 28vw, 260px)",cursor:ph==="ch"?"not-allowed":"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
                userSelect:"none",WebkitUserSelect:"none",WebkitTouchCallout:"none",
                opacity:ph==="ch"?.4:1,transition:"opacity .4s ease",
              }}
            >
            {/* Main progress ring — always visible */}
            <svg style={{position:"absolute",width:"100%",height:"100%",transform:"rotate(-90deg)"}} viewBox="0 0 180 180">
              {/* Track */}
              <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(232,115,74,.1)" strokeWidth="2"/>
              {/* Progress fill */}
              <circle cx="90" cy="90" r="84" fill="none" stroke="#e8734a" strokeWidth={holding?"3":"0"}
                strokeDasharray={`${holdProgress * 528} 528`}
                strokeLinecap="round"
                style={{filter:holdProgress>0?"drop-shadow(0 0 6px rgba(232,115,74,.6))":"none",transition:holding?"none":"stroke-width .3s ease"}}
              />
              {/* Completion flash */}
              {holdProgress>0.95&&(
                <circle cx="90" cy="90" r="84" fill="none" stroke="#e8734a" strokeWidth="4" opacity=".5"
                  style={{filter:"drop-shadow(0 0 12px rgba(232,115,74,.8))"}}
                />
              )}
            </svg>
            {/* Outer decorative rotating ring */}
            <div style={{
              position:"absolute",inset:6,borderRadius:"50%",
              border:"1px solid rgba(232,115,74,.08)",
              animation:holding?"ringRotate 2s linear infinite":"ringRotate 12s linear infinite",
            }}>
              <div style={{position:"absolute",top:-2,left:"50%",marginLeft:-2,width:4,height:4,borderRadius:"50%",background:"#e8734a",opacity:holding?.8:.4}}/>
              <div style={{position:"absolute",bottom:-2,left:"50%",marginLeft:-2,width:3,height:3,borderRadius:"50%",background:"#e8734a",opacity:.2}}/>
            </div>
            {/* ── 3D GLASS ORB — AMETHYST ── */}
            <div style={{
              width:"clamp(140px, 20vw, 190px)",height:"clamp(140px, 20vw, 190px)",borderRadius:"50%",position:"relative",
              background:holding
                ?`radial-gradient(circle at 36% 30%, rgba(255,190,150,${.16+holdProgress*.2}) 0%, rgba(232,115,74,${.1+holdProgress*.15}) 25%, rgba(160,65,30,${.08+holdProgress*.1}) 55%, rgba(50,20,8,.55) 100%)`
                :"radial-gradient(circle at 36% 30%, rgba(255,190,150,.12) 0%, rgba(232,115,74,.08) 25%, rgba(160,65,30,.06) 55%, rgba(50,20,8,.5) 100%)",
              boxShadow:holding
                ?`0 10px 40px rgba(0,0,0,.6), 0 4px 16px rgba(0,0,0,.4), 0 0 ${20+holdProgress*50}px rgba(232,115,74,${.1+holdProgress*.3}), inset 0 -6px 16px rgba(0,0,0,.35), inset 0 4px 10px rgba(255,190,150,${.04+holdProgress*.1})`
                :"0 10px 40px rgba(0,0,0,.5), 0 4px 16px rgba(0,0,0,.3), 0 0 20px rgba(232,115,74,.06), inset 0 -6px 16px rgba(0,0,0,.3), inset 0 4px 10px rgba(255,190,150,.04)",
              border:"1px solid rgba(232,115,74,.08)",
              display:"flex",alignItems:"center",justifyContent:"center",
              animation:!holding&&ph==="idle"?"orbPulse 3s ease-in-out infinite":"none",
              transition:"all .25s ease",
              transform:holding?`scale(${0.95 + holdProgress * 0.1})`:"scale(1)",
              cursor:"pointer",overflow:"hidden",
            }}>
              {/* Glass specular highlight — top-left */}
              <div style={{position:"absolute",top:10,left:14,width:50,height:32,borderRadius:"50%",
                background:"radial-gradient(ellipse, rgba(255,210,180,.18) 0%, rgba(255,210,180,.05) 50%, transparent 100%)",
                transform:"rotate(-25deg)",opacity:holding?(.5+holdProgress*.5):.45,transition:"opacity .2s",pointerEvents:"none"}}/>
              {/* Tight specular dot */}
              <div style={{position:"absolute",top:18,left:28,width:20,height:12,borderRadius:"50%",
                background:"radial-gradient(ellipse, rgba(255,255,255,.12) 0%, transparent 100%)",
                transform:"rotate(-25deg)",pointerEvents:"none"}}/>
              {/* Bottom rim light */}
              <div style={{position:"absolute",bottom:6,right:12,width:36,height:18,borderRadius:"50%",
                background:"radial-gradient(ellipse, rgba(232,115,74,.06) 0%, transparent 80%)",
                transform:"rotate(15deg)",pointerEvents:"none"}}/>
              {/* Inner glow on hold */}
              {holding&&<div style={{position:"absolute",inset:0,borderRadius:"50%",
                background:`radial-gradient(circle at 50% 55%, rgba(232,115,74,${holdProgress*.25}) 0%, transparent 55%)`,
                pointerEvents:"none"}}/>}
              {/* Label — BOLD */}
              <span style={{
                fontFamily:"'Cinzel',serif",fontSize:"clamp(11px, 1.4vw, 14px)",fontWeight:600,
                color:holding?`rgba(255,210,180,${.5+holdProgress*.5})`:"rgba(255,210,180,.55)",
                letterSpacing:".12em",textTransform:"uppercase",textAlign:"center",lineHeight:1.5,
                position:"relative",zIndex:1,
                textShadow:holding?`0 0 ${8+holdProgress*12}px rgba(232,115,74,${holdProgress*.5})`:"0 1px 3px rgba(0,0,0,.4)",
                transition:"all .2s ease",
                animation:!holding&&ph==="idle"?"textGlow 3s ease-in-out infinite":"none",
              }}>
                {ph==="ch"?"◌ ◌ ◌":holding?"channeling":mode&&rds.length>0?<>Sign<br/>{rds.length+1} of {mode}</>:<>Ask the<br/>Universe</>}
              </span>
            </div>
            </div>
          </div>{/* end sacred geometry wrapper */}
          {/* Hint */}
          {ph==="idle"&&!holding&&(
            <span style={{
              fontFamily:"'Raleway',sans-serif",fontSize:10,fontWeight:300,color:"rgba(255,220,200,.2)",
              letterSpacing:".15em",textTransform:"uppercase",
              animation:"fadeIn .8s ease .5s both",
            }}>
              {mode&&rds.length>0?"hold to channel next sign":"press & hold"}
            </span>
          )}
        </div>
      )}

      {/* After first sign */}
      {ph==="show"&&!mode&&!fin&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,animation:"fadeIn .6s ease .4s both",zIndex:2}}>
          <span style={{fontFamily:"'Raleway',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,220,200,.25)",letterSpacing:".12em",textTransform:"uppercase"}}>Need more clarity?</span>
          <div style={{display:"flex",gap:10}}>
            <button className="opt" onClick={()=>bo(3)}>Best of 3</button>
            <button className="opt" onClick={()=>bo(5)}>Best of 5</button>
          </div>
        </div>
      )}

      {/* After bo5 */}
      {fin&&mode===5&&(
        <div style={{textAlign:"center",animation:"fadeIn .6s ease .5s both",zIndex:2,marginBottom:14,maxWidth:380}}>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,fontWeight:300,color:"rgba(255,220,200,.4)",fontStyle:"italic",lineHeight:1.8,margin:0}}>
            Five signs from across the veil. The universe spoke — five times it spoke. The answer was inside you before you asked. Trust what you feel. Go.
          </p>
        </div>
      )}

      {/* After bo3 */}
      {fin&&mode===3&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,animation:"fadeIn .5s ease .5s both",zIndex:2}}>
          <span style={{fontFamily:"'Raleway',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,220,200,.25)",letterSpacing:".12em",textTransform:"uppercase"}}>Still uncertain?</span>
          <button className="opt" onClick={()=>{setMode(5);setFin(null);setPh("idle")}}>Best of 5</button>
        </div>
      )}

      {/* Reset */}
      {(ph==="show"||ph==="done")&&(
        <div style={{marginTop:28,animation:"fadeIn .5s ease .8s both",zIndex:2}}>
          <button className="rst" onClick={reset}>↻ channel again</button>
        </div>
      )}
      <Analytics />
    </div>
  );
}
