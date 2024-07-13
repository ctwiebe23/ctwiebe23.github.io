# Hasse Diagram Pseudocode

## Relation

Models a one-to-many relation (pointing to other relations).

Relation must be antisymmetric.

    Object Relation(parent) Is
    |   parent <- parent
    |   children <- { }
    |   Function DESCENDANTS() Is
    |   |   desc <- children
    |   |   Foreach child in children Do
    |   |   |   desc <- desc || child.DESCENDANTS()
    |   |   Done
    |   |   Return desc
    |   End
    End

## GetFullGraph

Takes a set of elements and relation that is a partial order of those elements,
and returns a complete set of every relation between elements.

    INPUT  : A set S of size n and a relation R
    OUTPUT : A set of each relation between elements in S

    T <- MAP(RELATION, S)
    For i <- 1 To n - 1 Do
    |   For k <- i + 1 To n Do
    |   |   If T[i] R T[k] Then
    |   |   |   T[i].children <- T[i].children || { T[k] }
    |   |   Elif T[k] R T[i] Then
    |   |   |   T[k].children <- T[k].children || { T[i] }
    |   |   Fi
    |   Done
    Done
    Return T

## GetTransitiveReduction

Takes a full set of every relation between elements and removes all transitive
relations, producing a set of relations proper for hasse diagrams.

    INPUT  : A set S of relations
    OUTPUT : A transitive reduction of S

    reduction <- { }
    Foreach old in S Do
    |   new <- COPY(old)
    |   Foreach child in new.children Do
    |   |   new.children <- new.children \ child.DESCENDANTS()
    |   Done
    |   reduction <- reduction || { new }
    Done
    Return reduction

## PlotGraph

Takes a transitive reduction of relations and returns an array of the roots of
the hasse diagram that each point to the next step in the branch, with the
coordinates of each node initialized.

**NOTE** : Pointers are not transfered properly in previous steps, so pointers
in tree must be manually set now.

    INPUT  : A set S of relations
    OUTPUT : A plotted hasse diagram

    Function GETROOTS(relations) Is
    |   roots <- { }
    |   Foreach relation in relations Do
    |   |   If relation has no parents Then
    |   |   |   roots <- roots || { relation }
    |   |   Fi
    |   Done
    |   xpad <- 100 / (roots.size + 1)
    |   For i <- 1 To roots.size Do
    |   |   roots[i].x <- i * xpad
    |   Done
    |   Return roots
    End

    T <- S
    tiers <- { }
    While T is not empty Do
    |   level <- GETROOTS(T)
    |   T <- T \ level
    |   tiers <- tiers || { level }
    Done
    ypad <- 100 / (tiers.size + 1)
    For i <- 1 To tiers.size Do
    |   Foreach node in tiers[i] Do
    |   |   node.y <- i * ypad
    |   Done
    Done
    Return tiers
