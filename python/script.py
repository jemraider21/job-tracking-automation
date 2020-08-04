websites = ["https://job-openings.monster.com/","https://www.indeed.com/","https://www.linkedin.com/jobs/","https://www.ziprecruiter.com/jobs/","https://www.dice.com/jobs/detail"]

file = open("urllink.txt");
url = file.read()

matchingURL = False
for site in websites:
    begin = url[:15]
    if(begin == site[:15]):
        matchingURL = True
        print("%s matches that of %s" % (url, site))
        break