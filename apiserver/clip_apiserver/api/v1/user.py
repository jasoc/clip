from fastapi import APIRouter
from random import randint

user_router = APIRouter()

@user_router.get("/test")
def user_test():
    return { "mbare": "onesto" }


@user_router.get("/ping")
def user_test():
    return { "pong": rand_str() }

names=["We","I","They","He","She","Jack","Jim"]
verbs=["was", "is", "are", "were"]
nouns=["playing a game", "watching television", "talking", "dancing", "speaking"]

def rand_str():
    return names[randint(0,len(names)-1)]+" "+verbs[randint(0,len(verbs)-1)]+" "+nouns[randint(0,len(nouns)-1)]
