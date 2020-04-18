from flask import Flask, render_template, jsonify
import pymongo
app = Flask(__name__)
import json
from bson import json_util
from flask import Flask, render_template
import os
import pandas as pd

#setup folder structure
app.static_folder = 'static'

#setup js library
#jslink = "https://d3js.org/d3.v5.min.js"
#jslink_2 = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"

#from urllib.request import urlopen

#link = "https://d3js.org/d3.v5.min.js"
#link_2 = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"
#f = urlopen(link)
#ff= urlopen(link_2)
#myfile = f.read()
#myfile_2 = ff.read()

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
# db = client.Carbon_Dioxide_Emissions

#connect to final mongo db by Ben
db= client.CO_2_Emissions
#db_2=client.CO_2_Emissions
#GHGemissions = db.GHG_Emissions

#declare emissions data 
emissions_data = db.final_emissions
#emissions_data_pivot = db_2.final_emissions_pivot_lc


#Countries = db.Locations_for_Countries

@app.route("/")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    #GHGinfo = list(GHGemissions.find())
    #GHGresults = json.dumps(GHGinfo, default=json_util.default)
    emissions_info = list(emissions_data.find())
    emissions_results = json.dumps(emissions_info, default=json_util.default)    
    print(emissions_info)    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index.html", emissions_info=emissions_results)

@app.route("/Page_1")
def Page1():
    # write a statement that finds all the items in the db and sets it to a variable
    #GHGinfo = list(GHGemissions.find())
    #GHGresults = json.dumps(GHGinfo, default=json_util.default)
    #print(GHGinfo)

    #Countriesinfo = list(Countries.find())
    #Countriesresults = json.dumps(Countriesinfo, default=json_util.default)
    #print(Countriesinfo)

     #normal emissions info using Kelvins method
    emissions_info = list(emissions_data.find())
    emissions_results = json.dumps(emissions_info, default=json_util.default)    
    print(emissions_info)    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("Page_1.html", emissions_info=emissions_results)
    

    #print(emissions_info_pivot)
    # render an .html template and pass it the data you retrieved from the database
    #return render_template("Page_1.html", GHGinfo=GHGresults,Countriesinfo=Countriesresults)
    #return render_template("Page_1.html", emissions_info=emissions_info.to_dict(), emissions_info_pivot=emissions_info_pivot.to_dict())

@app.route("/Page_2")
def Page2():
    # write a statement that finds all the items in the db and sets it to a variable
    #GHGinfo = list(GHGemissions.find())
    #GHGresults = json.dumps(GHGinfo, default=json_util.default)
    #print(GHGinfo)

    #Countriesinfo = list(Countries.find())
    #Countriesresults = json.dumps(Countriesinfo, default=json_util.default)
    #print(Countriesinfo)
    #dataset = tablib.Dataset()
    #with open(os.path.join(os.path.dirname(__file__),'final_emissions.csv')) as f:
    #    dataset.csv = f.read()
 
    #data_emit = dataset.html
    #return dataset.html
 
    emissions_info = list(emissions_data.find())
    emissions_results = json.dumps(emissions_info, default=json_util.default)    
    print(emissions_info)    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("Page_2.html", emissions_info=emissions_results)
  
@app.route("/Page_3")
def Page3():
    # write a statement that finds all the items in the db and sets it to a variable
    #GHGinfo = list(GHGemissions.find())
    #GHGresults = json.dumps(GHGinfo, default=json_util.default)
    #print(GHGinfo)

    #normal emissions info using Kelvins method
    emissions_info = list(emissions_data.find())
    emissions_results = json.dumps(emissions_info, default=json_util.default)    
    print(emissions_info)    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("Page_3.html", emissions_info=emissions_results)

@app.route("/data")
def data():
    # write a statement that finds all the items in the db and sets it to a variable
    #GHGinfo = list(GHGemissions.find())
    #GHGresults = json.dumps(GHGinfo, default=json_util.default)
    #print(GHGinfo)

    #Countriesinfo = list(Countries.find())
    #Countriesresults = json.dumps(Countriesinfo, default=json_util.default)
    #print(Countriesinfo)

    emissions_info = list(emissions_data.find())
    emissions_results = json.dumps(emissions_info, default=json_util.default)    
    print(emissions_info)    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("data.html", emissions_info=emissions_results)

if __name__ == "__main__":
    app.run(debug=True)